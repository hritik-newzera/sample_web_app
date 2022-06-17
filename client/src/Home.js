import React, {useEffect, useState} from "react";
import Contact from "./Contact";
import "./Home.css";
const imageSliderImages = ['./assets/Images/image-1.png', './assets/Images/image-2.png'];

export default function Home() {
  const [imageNumber, setImageNumber] = useState(0);
  const [loadContactForm, setLoadContactForm] = useState(false);
  

  useEffect(() => {
    const imageSliderInterval = setInterval(() => {
      setImageNumber(imageNumber => (imageNumber+1)%imageSliderImages.length);
    },2500);
    return () => {
      clearInterval(imageSliderInterval);
    }
  },[]);

  return (<>
    <Contact showContactForm={loadContactForm} setLoadContactForm={setLoadContactForm} />
    <div id="home" style={loadContactForm ? {filter: 'brightness(0.4)'} : null}>
      <header>
        <div id="headerInfo">
          <img src={require('./assets/Images/cat_and_dog_logo.png')} alt="logo" id="logo" />
        </div>
        <nav id="navBar">
          <button className="navLinks">About</button>
          <button className="navLinks">Blog</button>
          <button className="navLinks">Careers</button>
          <button className="navLinks" onClick={() => setLoadContactForm(true)}>Contact</button>
        </nav>
      </header>
      <section id="webpage">
        <article id="websiteInformationContainer">
            <div id="websiteInformation">
                <div id="heading">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div>
                <div id="subHeading">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</div>
                <div id="appLinksContainer">
                    <img alt="AppStoreBadge" height='45px' className="appLinks" src={require('./assets/Images/AppStoreBadge.png')} />
                    <img alt="GooglePlayBadge" className="appLinks" src={require('./assets/Images/google-play-badge.png')} />
                </div>
            </div>
        </article>
        <article id="imageSlider" style={{ backgroundImage: `url(${require(`${imageSliderImages[imageNumber]}`)})` }}>
            <div id="imageInfoContainer">
              <div id="imageInfo">
                <div id="imageHeading">Type Text</div>
                <div id="imageSubHeading">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div>
                <div id="imageSliderDotsContainer">{
                  imageSliderImages.map((item,idx) => (
                    <p key={idx} className="imageSliderDots" style={idx === imageNumber ? {backgroundColor : '#ffe8df'} : null} onClick={() => setImageNumber(idx)} ></p>
                  ))
                }</div>
              </div>
              <div id="socialMediaIconsContainer">
                <img alt="FacebookIcon" className="socialMediaIcons" src={require('./assets/Images/FB-icon-black@2x.png')} />
                <img alt="LinkedinIcon" className="socialMediaIcons" src={require('./assets/Images/linkedin-icon-black@2x.png')} />
                <img alt="TwitterIcon" className="socialMediaIcons" src={require('./assets/Images/Twitter-icon-black@2x.png')} />
              </div>
            </div>
        </article>
      </section>
    </div>
    </>);
}
