import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import Button from "./button";
import Modal from "./modal";
import styled from "styled-components";
import { palette } from "../assets/styles/palette";
import puppyProfile from "../assets/images/puppyProfile.jpg";
import catProfile from "../assets/images/catProfile.jpg";
import defaultProfile from "../assets/images/defaultProfile.jpg";
import exampleCMD from "../assets/images/exampleCMD.png";
import { ImagePreview, ImagePreviewItem } from "./post-modal";
import axios from "axios";
import EditPostModal from "./edit-post-modal";

interface ViewPostModalDefaultType {
    //onClickToggleModal: () => void;
    onClose: () => void;
    missionPostId: number;
    jaraUsId: number;
}

interface ProfileProps {
    profile: string;
    className: string;
}

const Form = styled.form`
    margin-top: auto;
    display: flex;
    width: 100%;
`;

const Input = styled.input`
    width: 90%;
    padding: 10px 20px;
    font-size: 16px;
    border: 1px solid #F0F0F0;
    border-radius: 30px 0 0 30px;
`;

const LeftContainer = styled.div`
    width: 60%;
    height: 100%;
    padding: 30px 15px;
    padding-right: 30px;
    overflow: auto;

    .infoEdit{
        display: flex;
    }
`;

const RightContainer = styled.div`
    width: 40%;
    height: 100%;
    padding: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const InfoWrapper = styled.div`
    width: 100%;
    display: flex;
`;

const WriterInfoWrapper = styled.div`
    display: block;
    margin: 12px;
`;

const ProfileContainer = styled.img`
    border-radius: 50%;

    &.writer {
        width: 60px;
    }

    &.comment {
        width: 50px;
    }

`;

const ProfileImg : React.FC<ProfileProps> = ({profile, className}) => (
    <ProfileContainer src={profile} className={className}></ProfileContainer>
);

const WriterName = styled.div`
    font-weight: 550;

    &.post {
        font-size: 20px;
    }

    &.comment {
        font-size: 15px;
    }
`;

const WrittenDateTime = styled.div`
    font-size: 13px;
    color: ${palette.jarameGrey};
    margin-top: 5px;
`;

const PostWrapper = styled.div`
    width: 100%;
    height: 85%;
`;

const Title = styled.h1`

    &.post{
        font-size: 17px;
        font-weight: 550;
        margin-top: 20px;
    }

    &.comment{
        font-size: 20px;
    }
`;

const Content = styled.h3`
    font-size: 14px;

    &.post{
        margin-top: 20px;
        line-height: 180%;
    }

    &.comment {
        margin-top: 5px;
        line-height: 160%
    }
`;

const EmotionBox = styled.div`
    width: 70%;
    height: 40px;
    border-radius: 30px;
    margin: 20px 0px;
    border: 1px solid ${palette.jarameGrey};
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    svg{
        width: 30px;
        cursor: pointer;
        strokeWidth: 1;
        transition: stroke 0.3s;
        stroke: ${palette.jarameGrey};
    }

    svg.clicked {
        stroke: red;
    }

`;

const CommentBox = styled.div`
    width: 100%;
    border-top: 1px solid ${palette.jarameGrey};
    border-bottom: 1px solid ${palette.jarameGrey};
    padding: 10px 5px;
    
    .infoSvg {
        display: flex;
    }

    svg {
        width: 20px;
        cursor: pointer;
    }
`;

interface CommentDTO {
    commentId: number;
    commentContent: string;
    commentDateTime: string;
    nickname: string;
    profileImage: string;
}


interface CommentProps {
    item: CommentDTO;
    setComments: React.Dispatch<React.SetStateAction<CommentDTO[]>>;
}

// 댓글 작성
const postComment = async(missionPostId:number, comment: string, comments:CommentDTO[], setComments:React.Dispatch<React.SetStateAction<CommentDTO[]>>) => {
    try {
        
        const stringMissionPostId = missionPostId.toString();

        const commentData = {
            missionPostId: stringMissionPostId,
            commentContent: comment,
            commentDateTime: new Date().toISOString(),
        };

        const response = await axios.post("/api/comment/add", commentData);

        // 서버 응답 확인
        if (response.status === 200) {
            alert(response.statusText);

            // 댓글 목록에 추가
            const updatedComments = [...comments, response.data.commentDTO];
            setComments(updatedComments);
        }
    } catch (error) {
        console.error("Error post comment: ", error);
    }
};


// 댓글 삭제
const deleteComment = async(commentId: number) => {
    try {
        // delete 요청을 보내어 댓글 삭제
        
        const response = await axios.delete(`/api/comment/delete?commentId=${commentId}`);

        if (response.status === 200) {
            alert(response.statusText);
            console.log("댓글 삭제 성공");
        } else if (response.status === 400) {
            alert(response.statusText);
            console.log("댓글 삭제 실패");
        } 

        return response.status;

    } catch (error) {
        console.error("Error delete comment: ", error);
    }
};

function Comment({item, setComments}:PropsWithChildren<CommentProps>) {

    const onClickDeleteComment = async () => {

      const ok = confirm("댓글을 삭제하시겠습니까?");
      
      if (ok) {
        console.log("댓글 삭제");
        //const responseStatus = await deleteComment(item.commentId);

        //if (responseStatus === 200) {
            setComments((prevComments) => {
                return prevComments.filter(comment => comment.commentId != item.commentId)
            });
        // };
      };
    };


    return (
        <CommentBox>
            <div className="infoSvg">
                <InfoWrapper>
                <ProfileImg profile={item.profileImage} className="comment"></ProfileImg>
                <WriterInfoWrapper>
                    <WriterName className="comment">{item.nickname}</WriterName>
                    <WrittenDateTime>{item.commentDateTime}</WrittenDateTime>
                </WriterInfoWrapper>
                </InfoWrapper>
                
                <span onClick={onClickDeleteComment}>
                    <svg viewBox="0 0 20 20">
                            <path fill="grey" d="M7.083,8.25H5.917v7h1.167V8.25z M18.75,3h-5.834V1.25c0-0.323-0.262-0.583-0.582-0.583H7.667
                                c-0.322,0-0.583,0.261-0.583,0.583V3H1.25C0.928,3,0.667,3.261,0.667,3.583c0,0.323,0.261,0.583,0.583,0.583h1.167v14
                                c0,0.644,0.522,1.166,1.167,1.166h12.833c0.645,0,1.168-0.522,1.168-1.166v-14h1.166c0.322,0,0.584-0.261,0.584-0.583
                                C19.334,3.261,19.072,3,18.75,3z M8.25,1.833h3.5V3h-3.5V1.833z M16.416,17.584c0,0.322-0.262,0.583-0.582,0.583H4.167
                                c-0.322,0-0.583-0.261-0.583-0.583V4.167h12.833V17.584z M14.084,8.25h-1.168v7h1.168V8.25z M10.583,7.083H9.417v8.167h1.167V7.083
                                z"></path>
                        </svg>
                </span>
            </div>
            <Content className="comment">{item.commentContent}</Content>
        </CommentBox>
    );
};

interface Reaction {
    clicklike: boolean,
    clickgood: boolean,
    clickSmile: boolean    
}
// 리액션 추가
const postReaction = async(missionPostId: number, reactionType:string) => {
    try {
        const stringMissionPostId = missionPostId.toString();

        const reaction = {
            "missionPostId" : stringMissionPostId,
            "reactionType" : reactionType
        };

        const response = await axios.post("/api/reaction/add", reaction);

        if (response.status === 200) {
            // 성공
            alert(response.statusText);
            return true;
        } else if (response.status === 400) {
            // 실패 - 이미 다른 아이콘을 누른 상황
            alert(response.statusText);
            return false;
        }

    } catch (error) {
        console.error("Error post reaction: ", error);
        return false;
    }
};

const deleteReaction = async (missionPostId:number, reactionType: string) => {
    try {
        const stringMissionPostId = missionPostId.toString();

        const response = await axios.delete("/api/reaction/delete", {
            data: {
                missionPostId: stringMissionPostId,
                reactionType: reactionType
            },
        });

        if (response.status === 200) {
            // 성공
            alert(response.statusText);
            return true;
        } else {
            // 실패
            return false;
        }

    } catch (error) {
        console.error("Error delete reaction: ", error);
        return false;
    }
};

const handleReaction = async(missionPostId:number, reactionType:string, reactions: Reaction, setReactions: React.Dispatch<React.SetStateAction<Reaction>>) => {
    try {

        switch (reactionType) {
            case "like":
                if(reactions.clicklike) {
                    const success = await deleteReaction(missionPostId, reactionType);
                    if(success) {
                        setReactions((prevReactions) => ({ ...prevReactions, clicklike: false }));
                    }
                } else {
                    const success = await postReaction(missionPostId, reactionType);
                    if(success) {
                        setReactions((prevReactions) => ({ ...prevReactions, clicklike: true }));
                    }
                }
                break;

            case "good":
                if (reactions.clickgood) {
                    // const success = await deleteReaction(missionPostId, reactionType);
                    // if (success) {
                        setReactions((prevReactions) => ({ ...prevReactions, clickgood: false }));
                        alert("리액션을 취소하셨습니다");
                    //}
                } else {
                    // const success = await postReaction(missionPostId, reactionType);
                    // if (success) {
                        setReactions((prevReactions) => ({ ...prevReactions, clickgood: true }));
                    // }
                }
                break;
        case "smile":
            if (reactions.clickSmile) {
                // const success = await deleteReaction(missionPostId, reactionType);
                // if (success) {
                    setReactions((prevReactions) => ({ ...prevReactions, clickSmile: false }));
                    alert("리액션을 취소하셨습니다");
                // }
            } else {
                // const success = await postReaction(missionPostId, reactionType);
                // if (success) {
                    setReactions((prevReactions) => ({ ...prevReactions, clickSmile: true }));
                // }
            }
            break;
        default:
            break;
     }
        
    } catch (error) {
        console.error("Error handling reaction: ", error);
    }
};


function ViewPostModal(
   { //onClickToggleModal,
    onClose,
    missionPostId,
    jaraUsId
   }: PropsWithChildren<ViewPostModalDefaultType>
) {
    //  리액션 추가
    const [reactions, setReactions] = useState({
        clicklike: false,
        clickgood: false,
        clickSmile: false
    });

    // const [clicklike, setClicklike] = useState<boolean>(false);
    // const [clickgood, setClickgood] = useState<boolean>(false);
    // const [clickSmile, setClickSmile] = useState<boolean>(false);


    // const [missionPostId, setMissionPostId] = useState<number|null>(null);
    const [missionPostInfo, setMissionPostInfo] = useState<any>(null);

    const [comments, setComments] = useState<CommentDTO[]>([]);


    const getMissionPostInfo = async() => {
       
        try {
            const response = await axios.get(`/api/missionPost/get?missionPostId=${missionPostId}`);
            setMissionPostInfo(response.data);
            
            // response.data.commentDTO가 배열인지 확인 후 setComments 수행
            if (Array.isArray(response.data.commentDTO)) {
                setComments(response.data.commentDTO);
            } else {
                setComments([]);
            }

            //const reactionType = response.data.reactionType;

            /*
            switch(reactionType) {
                case "like":
                    setReactions((prevReactions) => ({ ...prevReactions, clicklike: true, clickgood: false, clickSmile: false }));
                    break;
                case "good":
                    setReactions((prevReactions) => ({ ...prevReactions, clicklike: false, clickgood: true, clickSmile: false }));
                    break;
                case "smile":
                    setReactions((prevReactions) => ({ ...prevReactions, clicklike: false, clickgood: false, clickSmile: true }));
                    break;
                default:
                    setReactions((prevReactions) => ({ ...prevReactions, clicklike: false, clickgood: false, clickSmile: false }));
                    break;
            }
            */

            setMissionPostInfo({
                "missionPostId": 3,
                "jaraUsId": 44,
                "postDateTime": "2024년 2월 5일",
                "nickname":"익명",
                "display": true,
                "anonymous": false,
                "textTitle": "1158 요세푸스 문제 ㅜㅜ",
                "textContent": `
                int main()<br>
                {<br>
                    int n, k;<br>
                    int count = 0;<br>
                    queue<int> q;<br>
                    vector<int> vec;<br>
                    scanf("%d %d", &n, &k);<br>
        <br>
                    for (int i = 1; i < n + 1; i++) {<br>
                        q.push(i);<br>
                    }<br>
                //q.size가 0(false)이 되면 while 탈출. 즉 큐가 빌 때까지 계속 반복한다.<br>
            	while (q.size()) {<br>
		                if (k - 1 == count) {<br>
	                    		vec.push_back(q.front());<br>
			                    q.pop();<br>
			                    count = 0;<br>
                        }<br>
            `,
                "imageContent": exampleCMD,
                "userProfileImage": defaultProfile,
                "reactionType":"good",
                "commentDTO":[
                    {
                        "commentId": 1,
                        "commentContent": "멋진 코드네요!",
                        "commentDateTime": "2024년 2월 5일",
                        "nickname": "A",
                        "profileImage": catProfile,
                        },
                        {
                        "commentId": 2,
                        "commentContent": "코딩의 신",
                        "commentDateTime": "2024년 2월 5일",
                        "nickname": "하트",
                        "profileImage": puppyProfile
                        }
                ]
                });




        } catch (error) {
            console.error("Error get mission post info: ", error);
        }
    };

    useEffect(()=> {
        getMissionPostInfo();
    }, []);


    useEffect(()=> {
        
        try{
            const reactionType = missionPostInfo.reactionType;

            switch(reactionType) {
                case "like":
                    setReactions((prevReactions) => ({ ...prevReactions, clicklike: true, clickgood: false, clickSmile: false }));
                    break;
                case "good":
                    setReactions((prevReactions) => ({ ...prevReactions, clicklike: false, clickgood: true, clickSmile: false }));
                    break;
                case "smile":
                    setReactions((prevReactions) => ({ ...prevReactions, clicklike: false, clickgood: false, clickSmile: true }));
                    break;
                default:
                    setReactions((prevReactions) => ({ ...prevReactions, clicklike: false, clickgood: false, clickSmile: false }));
                    break;
            }

            setComments(missionPostInfo.commentDTO);
        } catch (error) {
            console.error(error);
        }
    }, [missionPostInfo]);

    // 댓글 작성
    const [comment, setComment] = useState("");

    const onChangeComment = (e : React.ChangeEvent<HTMLInputElement>) => {
        setComment(e.target.value);
    };

    const onSubmitComment = (e: React.FormEvent) => {
        e.preventDefault();

        if(comment === "") {
            alert("댓글을 작성해 주세요");
            return;
        }

        postComment(missionPostId, comment, comments, setComments);
    };

    const [isOpenEditPostModal, setOpenEditPostModal] = useState<boolean>(false);

    const onClickToggleEditModal = useCallback(() => {
        setOpenEditPostModal(true);                                                                    
    }, [isOpenEditPostModal]);

    const onCloseEditModal = () => {
        setOpenEditPostModal(false);
    }
    
    return (
        <>
            {isOpenEditPostModal ? (
                <EditPostModal onClose={()=>{setOpenEditPostModal(false)}} missionPostId={missionPostId} jaraUsId={jaraUsId}></EditPostModal>
            ) :

            <Modal dialogClassName="viewPost" onClose={onClose}>
                {missionPostInfo && 
                (
                    <LeftContainer>
                    <div className="infoEdit">
                        <InfoWrapper>
                        <ProfileImg profile={missionPostInfo.userProfileImage} className="writer"></ProfileImg>
                            <WriterInfoWrapper>
                                <WriterName className="post">{missionPostInfo.nickname}</WriterName>
                                <WrittenDateTime>{missionPostInfo.postDateTime}</WrittenDateTime>
                        </WriterInfoWrapper>
                        </InfoWrapper>

                        <Button onClick={()=>{setOpenEditPostModal(true)}} type="button" className="edit" $buttonColor="jarameGrey" $fontColor="white" $fontSize="6">수정</Button>
                    </div>
                    <PostWrapper>
                        <Title className="post">{missionPostInfo.textTitle}</Title>
                    <Content className="post">
                        {missionPostInfo.imageContent === "" ? null : (<ImagePreview>
                    <ImagePreviewItem>
                    <img src={missionPostInfo.imageContent} alt="mission image" />
                    </ImagePreviewItem>       
            </ImagePreview>)}

            <div dangerouslySetInnerHTML={{__html:missionPostInfo.textContent}}/>
            
            </Content>


                    </PostWrapper>
                </LeftContainer>
                )}

                <RightContainer>
                    <EmotionBox>
                    <svg onClick={() => handleReaction(missionPostId, "like", reactions, setReactions)} className={`likeIcon ${reactions.clicklike ? "clicked" : ""}`} 
                    fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /> </svg>
                    <svg onClick={() => handleReaction(missionPostId, "good", reactions, setReactions)} className={`goodIcon ${reactions.clickgood ? "clicked" : ""}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                    </svg>
                    <svg onClick={() => handleReaction(missionPostId, "smile", reactions, setReactions)} className={`smileIcon ${reactions.clickSmile ? "clicked" : ""}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
    </svg>
                    </EmotionBox>

                    {/* 댓글 로딩 */}
                    {comments && comments.map((item) => (
                        <Comment key={item.commentId} item={item} setComments={setComments}></Comment>
                    ))}

                    {/* <Comment item={dummyComment} setComments={setComments}></Comment> */}

                    <Form onSubmit={onSubmitComment}>
                    <Input className="comment" onChange={onChangeComment} name="comment" value={comment} placeholder="댓글을 남겨 보세요" type="text"/>
                    <Button type="submit" $buttonColor="jarameBlue" $fontSize="15spx" $width="10%" $borderRadius="0 30px 30px 0"><svg width="20px" fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
    </svg></Button>
                    </Form>
                </RightContainer>
        </Modal>
}
    </>
    );

}

export default ViewPostModal;