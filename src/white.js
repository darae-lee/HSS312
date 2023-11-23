import React, { useState, useEffect } from 'react';
import { collection, addDoc, orderBy, getDocs, query } from "firebase/firestore";
import './Detail.css';
import whiteProfile from './images/white/white_profile.png';
import whiteData from './white.json';
import { dbService } from "./firebase.js";
import Modal from 'react-modal';

const ProfileSection = ( data ) => {
    const object = data.data;
    return (
    <div className='profile-section-container'>
        <div className='date'>{object.birth} ~ {object.death}</div>
        <div className='description'>저는 {object.description}입니다.</div>
        <div className='intro-wrapper'>
        {object.intro.map((intro, index) => (
          <div className="intro-box" key={index}>
            {intro}
          </div>
        ))}
        </div>
    </div>
    );
}

const PostSection = ({ posts }) => {
    const [selectedPost, setSelectedPost] = useState(null);
  
    const handlePostClick = (post) => {
      post.imageSrc = require(`${post.image}`);
      setSelectedPost(post);
    };
  
    const handleClosePopup = () => {
      setSelectedPost(null);
    };
  
    return (
      <div className="post-section-container">
        {posts.map((post, index) => (
          <div className="post-box" key={index} onClick={() => handlePostClick(post)}>
            <img
              className="post-image"
              src={require(`${post.image}`)}
              alt={post.text}
            />
            <div className="overlay">
              {post.text.substr(0, 20)}...
            </div>
          </div>
        ))}
  
        {/* Modal */}
        <Modal
          isOpen={!!selectedPost}
          onRequestClose={handleClosePopup}
          contentLabel="Post Modal"
          className="post-modal"
        >
          <div className="popup-box">
            <div className="popup-close" onClick={handleClosePopup}>
              &times;
            </div>
            <img
              className="popup-image"
              src={selectedPost?.imageSrc}
              alt={selectedPost?.text}
            />
            <div className="popup-text-wrapper">
              <div className="popup-text">{selectedPost?.text}</div>
              <div className="popup-footer">{selectedPost?.time}, 한국</div>
            </div>
          </div>
        </Modal>
      </div>
    );
  };

const GuestSection = () => {
    const [guestbook, setGuestbook] = useState([]);
    const [name, setName] = useState('');
    const [content, setContent] = useState('');
  
    const handleGuestbookSubmit = async () => {
        try {
            if (!content) {
                window.alert('내용을 입력해주세요!')
            } else if (!name) {
                window.alert('이름을 입력해주세요!')
            } else if (name && content) {

                await addDoc(collection(dbService, 'white'), {
                    name,
                    content,
                    timestamp: new Date(),
                });
        
                const projectsCollection = collection(dbService, 'white');
                const q = query(projectsCollection, orderBy('timestamp', 'desc'));
                const querySnapshot = await getDocs(q);
                const guestsData = querySnapshot.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                setGuestbook(guestsData);
        
                setName('');
                setContent('');
            };
        } catch (error) {
          console.error('Error adding guestbook entry:', error);
        };
    };
  
    useEffect(() => {
      const fetchGuests = async () => {
        const projectsCollection = collection(dbService, 'white');
        const q = query(projectsCollection, orderBy('timestamp', 'desc'));
  
        try {
          const querySnapshot = await getDocs(q);
          const guestsData = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setGuestbook(guestsData);
        } catch (error) {
          console.error('Error fetching guests: ', error);
        }
      };

      fetchGuests();
    }, []);
  
    return (
      <div className="guest-section-container">
        <div className="guest-input-box">
          <input
            type="text"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="guest-input-name"
          />
          <textarea
            placeholder="내용"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="guest-input-content"
          />
          <button onClick={handleGuestbookSubmit}>입력</button>
        </div>
        <div className="guest-display-wrapper">
          {guestbook.map((entry, index) => (
            <div key={index} className="guest-display-box">
              <div className="guest-display-name">{entry.name}</div>
              <div className="guest-display-content balloon_03">{entry.content}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

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
                    <GuestSection/>
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