package siliconDream.jaraMe.service;

import org.springframework.stereotype.Service;
import siliconDream.jaraMe.repository.PointRepository;
import siliconDream.jaraMe.domain.User;

import java.time.LocalDateTime;


public interface PointService {
   boolean checkIn(Long userId, LocalDateTime dateTime);
   boolean passTicket(Long userId);

   int pointPlus(Long userId, int changeAmount);

}
