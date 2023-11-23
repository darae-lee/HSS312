import React, { useState, useEffect } from 'react';
import './Detail.css';
import whiteProfile from './images/white/white_profile.png';
import higginsProfile from './images/higgins/higgins_profile.jpg';
import whiteData from './white.json'

const ProfileSection = ( data ) => {
    const object = data.data;
    return (
    <div>
        <p>나이: {object.age}</p>
        <p>직업: {object.occupation}</p>
        <p>{object.description}</p>
        {/* Use require to dynamically import the image */}
        {/* <img src={require(`${object.image}`)}/> */}
    </div>
    );
}

const PostSection = ( posts ) => {
    return (
        <div className="post-section-containter">
            {posts.posts.map((post, index) => (
                <div className="post-box">
                    <img className="post-image" src={require(`${post.image}`)}/>
                    <div className="post-text-wrapper">
                        <div className="post-text">{post.text}</div>
                        <div className="post-footer">{post.time}, 한국</div>
                    </div>
                </div>
            ))}
        </div>
    )
}


const DetailWhite = () => {
  const [selectedSection, setSelectedSection] = useState('프로필');

  const handleSectionClick = (section) => {
    setSelectedSection(section);
  };

  return (
    <div className="App">
      <div className='wrap'>
        <div className='detail-image'>
            <img src={whiteProfile}/>
        </div>
        <div className='detail-name'><span>{whiteData.name}</span></div>
        <div className="detail-body">
            <div className="section-buttons">
                <button
                    onClick={() => handleSectionClick('프로필')}
                    className={selectedSection === '프로필' ? 'active' : ''}
                >
                    프로필
                </button>
                <button
                    onClick={() => handleSectionClick('게시글')}
                    className={selectedSection === '게시글' ? 'active' : ''}
                >
                    게시글
                </button>
                <button
                    onClick={() => handleSectionClick('방명록')}
                    className={selectedSection === '방명록' ? 'active' : ''}
                >
                    방명록
                </button>
            </div>
            <div className="selected-section">
                {selectedSection === '프로필' && (
                    <ProfileSection data={whiteData}/>
                )}
                {selectedSection === '게시글' && (
                    <PostSection posts={whiteData.post}/>
                )}
                {selectedSection === '방명록' && (
                    <div>
                    {/* 방명록 섹션 내용 */}
                    방명록 섹션 내용이 여기에 들어갑니다.
                    </div>
                )}
                </div>
            </div>
        </div>
        <footer>
          [HSS312] Darae Lee
        </footer>
    </div>
  );
};

export default DetailWhite;