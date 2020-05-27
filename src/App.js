import React from 'react';
import Header from './components/Header'
import MainFeaturedPost from './components/MainFeaturedPost'
import Footer from './components/Footer'
import Album from './components/Album'

const sections = [
  { title: 'Generator', url: '#' },
  { title: 'Your mementors', url: '#' }
];

const mainFeaturedPost = {
  title: `Generate your mementor, it's free!`,
  description:
    "A few simple steps to generate your mementor",
  image: 'https://source.unsplash.com/random',
  imgText: 'main image description'
};

function App() {
  return (
    <>
    <Header title="Mementor" sections={sections}></Header>
    <MainFeaturedPost post={mainFeaturedPost} />
    <Album></Album>
    <Footer></Footer>
    </>
  );
}

export default App;
