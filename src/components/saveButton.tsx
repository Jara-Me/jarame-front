import Button from "./button";

function SaveButton() {

    // 입력된 비밀번호와 유저 비밀번호 비교하는 로직 필요
    const OnClickSave = () => {
        const ok = confirm("변경 사항을 모두 저장하시겠습니까?");
        if(ok) {
            console.log("변경 사항 저장");
        };
    };

    return (
        <Button type="submit" onClick={OnClickSave} className="save" $buttonColor="jarameGrey" $fontColor="white" $fontSize="6">저장</Button>
    );
};


export default SaveButton;