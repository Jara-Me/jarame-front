import { PropsWithChildren, useEffect, useState } from "react";
import { Form, ImagePreview, ImagePreviewItem, Input, PostModalDefaultType, RemoveImageButton, Textarea, TitleBox, Toolbar } from "./post-modal";
import axios from "axios";
import Modal, { ModalTitle } from "./modal";
import Button from "./button";
import defaultProfile from "../assets/images/defaultProfile.jpg";
import exampleCMD from "../assets/images/exampleCMD.png";

function EditPostModal(
    { onClose, jaraUsId, missionPostId } : PropsWithChildren<PostModalDefaultType & {missionPostId:number}>
) {

    const [userId, setUserId] = useState<number|undefined>();

    useEffect(()=> {
        const fetchUserId = async () => {
            try {
                const response = await axios.get("/api/profile");
        
                if(response.status === 200) {
                    setUserId(response.data.userId);
                    
                } else {
                    console.error("Error get User Info")
                }
            } catch (error) {
                console.error("Error get User Info", error);
            }
    }
        fetchUserId();
    }, []);

    
    const [image, setImage] = useState<string|null>(null);
    const maxImageCount = 1;

    const handleImageUpload = (e:React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;

        if (selectedFiles) {

            const imageURL = URL.createObjectURL(selectedFiles[0]);

            if (image) {
                URL.revokeObjectURL(image);
            }
            
            if(selectedFiles.length > maxImageCount) {
                alert("이미지는 1개만 업로드할 수 있습니다");
            }

            setImage(imageURL);
        }
    }

    const removeImage = () => {
        if(image) {
            URL.revokeObjectURL(image);
        }
        setImage(null);
    };

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    
    const onChangeTitle = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {target : {name, value}} = e;
        
        if (name === "title") {
            setTitle(value);
        }
    };

    const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const {target : {name, value}} = e;

        if (name === "content") {
            setContent(value);
        }
    };

    // 공개 여부
    const [display, setDisplay] = useState<boolean>(true);

    // 익명
    const [anonymous, setAnonymous] = useState<boolean>(false);


    const [originalData, setOriginalData] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // 기존 데이터 불러오기
    useEffect(()=> {

        const fetchOriginalData = async() => {
            try {
                const response = await axios.get(`/api/missionPost/get?missionPostId=${missionPostId}&userId=${userId}`);

                if(response.status === 200) {
                    setOriginalData(response.data);
                }
                
            } catch (error) {
                console.error('Error fetch mission post info:', error);
            }
        };

        //fetchOriginalData();

        setOriginalData({
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
            "userProfileImage": defaultProfile
            });

            console.log(originalData);
    }, []);

    // 불러온 originalData로 수정
    useEffect(() => {


        if(originalData) {
            setTitle(originalData.textTitle);
            setContent(originalData.textContent);
            setImage(originalData.imageContent);
            setDisplay(originalData.display);
            setAnonymous(originalData.anonymous);

            setIsLoading(false);
        }
    }, [originalData]);


    const postEditedMissionPost = async() => {
        try {
            const postData = {
                textTitle: title,
                textContent: content,
                imageContent: image,
                display: display,
                anonymous: anonymous,
                postDateTime: new Date().toISOString(),
                jarausId : jaraUsId
            }

            const response = await axios.post(`api/missionPost/update?missionPostId=${missionPostId}`, postData);

            if (response.status === 200) {
                //성공 로직
                alert(response.statusText);
            }  else {
                alert("수정에 실패했습니다.");
                alert(response.statusText);
            }
            
        } catch (error) {
            console.error("Error post mission", error);
        }
    }

    const onSubmit = (e:React.FormEvent) => {
        e.preventDefault();
        alert("글이 수정되었습니다");
        postEditedMissionPost();
    };

    return (
        
        <Modal dialogClassName="editPost" onClose={onClose}>
        <ModalTitle>글 수정</ModalTitle>
        <Form onSubmit={onSubmit}>
        <Button type="submit" className="postBtn" $buttonColor="jarameBlue">수정</Button>

        {
            isLoading ? <p>인증글 정보를 가져오는 중입니다</p> : 
            
            <>
        <TitleBox>
          <Button type="button" onClick={()=>setDisplay(!display)} $buttonColor="jarameGrey" $fontSize="15spx" $width="10%" $borderRadius="50px 0px 0px 50px">{display ? "전체공개" : "나만보기"}</Button>
          <Input onChange = {onChangeTitle} name="title" className="title" value={title || ""} placeholder="제목" type="text" required></Input>
        </TitleBox>

        <Toolbar>
            <label className="imgBtn" title="이미지 업로드">
                <input type="file" accept="image/*" onChange={handleImageUpload} multiple style={{display: "none"}}/>
                <svg fill="none" width="30px" strokeWidth={1.5} stroke="grey" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>
            </label>

            <label className="anonymous" title="익명 공개 여부">
                <input type="checkbox" name="anonymous" checked={anonymous || false} onChange={()=>{setAnonymous(!anonymous)}}/>
                익명
            </label>
        </Toolbar>

        {image ? (<ImagePreview>
                <ImagePreviewItem>
                <RemoveImageButton title="이미지 삭제" onClick={() => removeImage()}>&times;</RemoveImageButton>
                <img src={image} alt="인증 이미지" />
                </ImagePreviewItem>         
        </ImagePreview>) : null}
        <Textarea onChange = {onChangeContent} name="content" value={content} placeholder="오늘의 미션 과정과 결과를 자유롭게 작성해 주세요." required></Textarea>
            </>
        }

        </Form>
    </Modal>
    )

}

export default EditPostModal;