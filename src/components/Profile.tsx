import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Switcher } from './auth-components';
import Puppy from '../assets/images/puppyProfile.jpg';

interface ProfileContentProps {
    className?: string;
    userId: number;
}
interface ProfileData {
    userId: number;
    nickname: string;
    profileImage: string;
    points: number;
    passTicket: number;
    participatingJaraUsCount: number;
  }
const ProfileContent: React.FC<ProfileContentProps> = ({ className, userId }) => {
    const [profile, setProfile] = useState<ProfileData | null>(null);
    useEffect(() => {
        const getProfileInfo = async () => {
        try {
            const response = await axios.get<ProfileData>(`/api/profile/${userId}`);
            if (response.data.userId!== undefined){
                setProfile(response.data);
            }else{
                setProfile({
                    "userId": 1,
                    "nickname": "silicondream",
                    "profileImage": "https://example.com/path/to/user/profile/image.jpg",
                    "points": 150,
                    "passTicket": 3,
                    "participatingJaraUsCount": 5
                  });
            }
        } catch (error) {
            console.error('Error fetching profile information:', error);
        }
        };
        getProfileInfo();
    }, []);

    return(
        <Profiles>
            <div className='profile-container'>
                <div className='user-photo'></div>
                <div className='user-name'>{profile?.nickname} 님</div>
                <div className='user-point'>
                <svg fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
</svg>{profile?.points} 포인트</div>
                <Switcher className="mypage">
                    <Link to="/mypage"><div className='user-page'>
                    <svg viewBox="0 0 20 20">
							<path fill="black" d="M10,10.9c2.373,0,4.303-1.932,4.303-4.306c0-2.372-1.93-4.302-4.303-4.302S5.696,4.223,5.696,6.594C5.696,8.969,7.627,10.9,10,10.9z M10,3.331c1.801,0,3.266,1.463,3.266,3.263c0,1.802-1.465,3.267-3.266,3.267c-1.8,0-3.265-1.465-3.265-3.267C6.735,4.794,8.2,3.331,10,3.331z"></path>
							<path fill="black" d="M10,12.503c-4.418,0-7.878,2.058-7.878,4.685c0,0.288,0.231,0.52,0.52,0.52c0.287,0,0.519-0.231,0.519-0.52c0-1.976,3.132-3.646,6.84-3.646c3.707,0,6.838,1.671,6.838,3.646c0,0.288,0.234,0.52,0.521,0.52s0.52-0.231,0.52-0.52C17.879,14.561,14.418,12.503,10,12.503z"></path>
					</svg>
                        마이페이지</div></Link>
                </Switcher>
                <div className='user-mission'>
                    <svg viewBox="0 0 20 20"> <path fill="black" d="M18.783,13.198H15.73c-0.431,0-0.78-0.35-0.78-0.779c0-0.433,0.349-0.78,0.78-0.78h2.273V3.652H7.852v0.922
                                c0,0.433-0.349,0.78-0.78,0.78c-0.431,0-0.78-0.347-0.78-0.78V2.872c0-0.43,0.349-0.78,0.78-0.78h11.711
                                c0.431,0,0.78,0.35,0.78,0.78v9.546C19.562,12.848,19.214,13.198,18.783,13.198z"></path>
                                <path fill="black" d="M12.927,17.908H1.217c-0.431,0-0.78-0.351-0.78-0.78V7.581c0-0.43,0.349-0.78,0.78-0.78h11.709
                                c0.431,0,0.78,0.35,0.78,0.78v9.546C13.706,17.557,13.357,17.908,12.927,17.908z M1.997,16.348h10.15V8.361H1.997V16.348z"></path>
                    </svg>참여 중인 미션 {profile?.participatingJaraUsCount}개</div>
            </div>
        </Profiles>
    )
}

const Profiles = styled.div`
    width: 580px;
    height: 150px;
    box-shadow: 5px 0 10px rgba(0, 0, 0, 0.1), -5px 0 10px rgba(0, 0, 0, 0.1) ;
    position: absolute;
    top:60px;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;

    .profile-container{
        width: 650px;
        height: 100px;
        margin-top: 30px;
        display: grid;
        grid-template-columns: 1fr 1.7fr 1.7fr;
    }
    .user-photo{
        margin: 0 auto;
        grid-row: span 2;
        width: 100px;
        height: 100px;
        border-radius: 100px;
        background-color: grey;
        background-image: url(${Puppy});
        background-size: cover; 
    }
    .user-name{
        margin-top: 10px;
        margin-left: -20px;
        font-size: 25px;
        font-weight: 30px;
    }
    .user-point {
        margin-top: 10px;
        margin-left: -120px;
    }
    .user-mission {
        margin-top: 10px;
        margin-left: -120px;
        white-space: nowrap;
    }
    
    .user-page{
        margin-top: 5px;
        margin-left: -90px;
        color: grey;
    }
    .user-page:hover{
        color: black;
    }
    svg {
        width: 20px;
        margin-right: 10px;
    }
    
`;

export default ProfileContent;