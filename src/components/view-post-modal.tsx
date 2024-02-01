import { PropsWithChildren, useEffect, useState } from "react";
import Button from "./button";
import Modal from "./modal";
import styled from "styled-components";
import { palette } from "../assets/styles/palette";
import puppyProfile from "../assets/images/puppyProfile.jpg";
import catProfile from "../assets/images/catProfile.jpg";
import { ImagePreview, ImagePreviewItem } from "./post-modal";
import axios from "axios";

interface ViewPostModalDefaultType {
    onClickToggleModal: () => void;
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

interface CommentProps {
    deleteComment: () => void;
}

function Comment() {
    
    const dummyComment = {
        userName: "지우",
        dateTime: "1월 13일 오후 9:21",
        profile: catProfile,
        content: "Good Work!"
    };

    const onClickDeleteComment = () => {
      const ok = confirm("댓글을 삭제하시겠습니까?");

      if (ok) {
        console.log("댓글 삭제");
      };

    };


    return (
        <CommentBox>
            <div className="infoSvg">
                <InfoWrapper>
                <ProfileImg profile={dummyComment.profile} className="comment"></ProfileImg>
                <WriterInfoWrapper>
                    <WriterName className="comment">{dummyComment.userName}</WriterName>
                    <WrittenDateTime>{dummyComment.dateTime}</WrittenDateTime>
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
            <Content className="comment">{dummyComment.content}</Content>
        </CommentBox>
    );
};


function ViewPostModal(
   { onClickToggleModal,
   }: PropsWithChildren<ViewPostModalDefaultType>
) {
    const dummyData = {
        userName: "익명",
        title: "Sample Title",
        content: "In the heart of the bustling city, where the neon lights paint the sky with vibrant hues, there exists a certain charm that captivates the soul. The rhythm of life echoes through the crowded streets, a symphony of diverse cultures and aspirations. As the sun sets behind the towering skyscrapers, the cityscape transforms into a canvas of twinkling lights, each one telling a story of dreams and ambitions. Amidst the urban chaos, hidden gems emerge – cozy cafes with the aroma of freshly brewed coffee, quaint bookshops inviting literary exploration, and serene parks offering an escape from the urban hustle. Every corner of the city has a tale to tell, from the historic landmarks standing as witnesses to bygone eras to the modern art installations pushing the boundaries of creativity. The people, a mosaic of backgrounds and experiences, create the tapestry of this metropolis. From the laughter of friends sharing a meal in a local diner to the solitary artist finding inspiration in a quiet studio, the city embraces diversity as its heartbeat. It's a place where innovation meets tradition, and where the relentless pursuit of excellence intertwines with the appreciation of simple pleasures.",
        profile: puppyProfile,
        dateTime: "1월 13일 오후 8:01",
        images: [catProfile]
    }

    const [clickHeart, setClickHeart] = useState<boolean>(false);
    const [clickThumbUp, setClickThumbUp] = useState<boolean>(false);
    const [clickSmile, setClickSmile] = useState<boolean>(false);

    const onClickIcon = (icon: string) => {
        switch (icon) {
            case "heart":
              setClickHeart(!clickHeart);
              if(clickThumbUp) {
                setClickThumbUp(false);
              }
              if(clickSmile) {
                setClickSmile(false);
              }
              break;
            case "thumbUp":
              setClickThumbUp(!clickThumbUp);
              if(clickHeart) {
                setClickHeart(false);
              }
              if(clickSmile) {
                setClickSmile(false);
              }
              break;
            case "smile":
              setClickSmile(!clickSmile);
              if(clickHeart) {
                setClickHeart(false);
              }
              if(clickThumbUp) {
                setClickThumbUp(false);
              }
              break;
            default:
              break;
          }
    };

    const [comment, setComment] = useState("");

    const onChangeComment = (e : React.ChangeEvent<HTMLInputElement>) => {
        setComment(e.target.value);
    };

    const onSubmitComment = (e: React.FormEvent) => {
        e.preventDefault();
        postComment();
    };

    const postComment = async() => {
        try {
            
            const commentData = {
                missionPostId: '1',
                commentContent: comment,
                commentDateTime: new Date().toISOString(),
            };

            const response = await axios.post("http://localhost:8080/comment/add", commentData);

            // 서버 응답 확인
            if (response.data.success) {
                alert("댓글이 등록되었습니다.");
            }
        } catch (error) {
            console.error("Error post comment: ", error);
        }
    };

    /* 댓글 조회?
    const [comments, setComments] = useState([]);

    const getComments = async(missionPostId: string) => {
        try {
            const response = await axios.get(`http://localhost:8080/comment/${missionPostId}`);
            setComments(response.data.comments);
        } catch (error) {
            console.error("Error get comments", error);
        }
    };

    useEffect(() => {
        getComments("1");
    }, []);
    */

    // 댓글 삭제
    const deleteComment = async(commentId: number) => {
        try {
            // delete 요청을 보내어 댓글 삭제
            const response = await axios.delete(`http://localhost:8080/comment/delete?commentId=${commentId}`);

            console.log(response.data);

            // 삭제한 댓글 화면에서 제거하는 로직 수행
            
        } catch (error) {
            console.error("Error delete comment: ", error);
        }
    };


    return (
        <Modal dialogClassName="viewPost" onClickToggleModal={onClickToggleModal}>
            <LeftContainer>
                <div className="infoEdit">
                    <InfoWrapper>
                    <ProfileImg profile={dummyData.profile} className="writer"></ProfileImg>
                        <WriterInfoWrapper>
                            <WriterName className="post">{dummyData.userName}</WriterName>
                            <WrittenDateTime>{dummyData.dateTime}</WrittenDateTime>
                    </WriterInfoWrapper>
                    </InfoWrapper>

                    <Button type="button" className="edit" $buttonColor="jarameGrey" $fontColor="white" $fontSize="6">수정</Button>
                </div>
                <PostWrapper>
                    <Title className="post">{dummyData.title}</Title>
                   <Content className="post">
                    {dummyData.images.length > 0 ? (<ImagePreview>
            {dummyData.images.map((imageURL, index) => (
                <ImagePreviewItem key={index}>
                <img src={imageURL} alt={`Image ${index + 1}`} />
                </ImagePreviewItem>            ))} 
        </ImagePreview>) : null}

        <div dangerouslySetInnerHTML={{__html:dummyData.content}}/>
        
        </Content>


                </PostWrapper>
            </LeftContainer>

            <RightContainer>
                <EmotionBox>
                <svg className={`heartIcon ${clickHeart ? "clicked" : ""}`} 
                onClick={() => onClickIcon("heart")} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /> </svg>
                <svg className={`thumbUpIcon ${clickThumbUp ? "clicked" : ""}`}
                onClick={() => onClickIcon("thumbUp")} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                </svg>
                <svg className={`smileIcon ${clickSmile ? "clicked" : ""}`}
                onClick={() => onClickIcon("smile")} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
</svg>
                </EmotionBox>

                <Comment></Comment>

                <Form onSubmit={onSubmitComment}>
                   <Input className="comment" onChange={onChangeComment} name="comment" value={comment} placeholder="댓글을 남겨 보세요" type="text"/>
                   <Button type="submit" $buttonColor="jarameBlue" $fontSize="15spx" $width="10%" $borderRadius="0 30px 30px 0"><svg width="20px" fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
</svg></Button>
                </Form>
            </RightContainer>
    </Modal>
    );

}

export default ViewPostModal;