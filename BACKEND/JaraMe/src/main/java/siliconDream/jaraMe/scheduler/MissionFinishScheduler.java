package siliconDream.jaraMe.scheduler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import siliconDream.jaraMe.domain.JaraUs;
import siliconDream.jaraMe.service.JaraUsService;
import siliconDream.jaraMe.service.JoinUsersService;
import siliconDream.jaraMe.service.MissionPostService;
import siliconDream.jaraMe.service.PointService;

import java.util.List;

@Component
public class MissionFinishScheduler {
    private final JaraUsService jaraUsService;
    private final MissionPostService missionPostService;
    private final PointService pointService;
    private final JoinUsersService joinUsersService;


    @Autowired
    public MissionFinishScheduler(JaraUsService jaraUsService,
                                  MissionPostService missionPostService,
                                  PointService pointService,
                                  JoinUsersService joinUsersService) {
        this.jaraUsService = jaraUsService;
        this.missionPostService = missionPostService;
        this.pointService = pointService;
        this.joinUsersService = joinUsersService;
    }


    //미션 종료일 다음날 00:00:00에 실시
    //미션 인증일의 참여율이 얼마나 되는지 확인=> 포인트 서비스를 통해 포인트 적립


    @Scheduled(cron = "0 0 0 * * *") //미션 종료일의 다음날 00:00:00에 실시되도록 함.
    public String missionComplete() {

        //어제 미션이 종료된 그룹들을 리스트로 얻은 다음,
        List<JaraUs> jaraUses = jaraUsService.findEndDateYesterDay();

        for (JaraUs jaraUs : jaraUses) {

            Long jaraUsId = jaraUs.getJaraUsId();
            //jaraUsId로 JoinUsers테이블에 필터링해서 참여중인 유저 알아내기
            List<Long> userIds = joinUsersService.findUserIdsByJaraUsId(jaraUsId);
            for (Long userId : userIds) {


                //미션에 참여한 유저들의 참여율 알아내기
                int plusPoint = missionPostService.missionParticipationRate(userId,jaraUsId); //JaraUsService가 더 적합할 것 같음.
                // 1/3 미만 : 미적립
                // 1/3 이상~ 2/3 미만 : 10
                // 2/3 이상~ 전체 미만 : 20
                // 전체 : 50

                //포인트 지급 로직 이용
                int updatedPoint = pointService.pointPlus(userId, plusPoint);
            }

            //return 메시지 작성 => mission연장 여부에 따라 결정
            //oo미션이 종료되었습니다. 포인트 ㅇㅇ이 적립되었습니다.
        }
        return "수정 예정";
    }


}

