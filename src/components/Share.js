import React from "react";
import {
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

const site = "https://mementors.herokuapp.com/";

const Share = (props) => {
  if (props.news) {
    return (
      <div>
        <FacebookShareButton
          url={site + props.news.id}
          quote={props.news.caption}
          hashtag={"#" + props.news.categories}
        >
          <FacebookIcon
            size={32}
            round={true}
            size="2.5rem"
            logoFillColor="white"
          />
        </FacebookShareButton>
        <TwitterShareButton
          url={site + props.news.id}
          title={props.news.caption}
        >
          <TwitterIcon size={32} round={true} size="2.5rem" />
        </TwitterShareButton>
        <WhatsappShareButton
          url={site + props.news.id}
          title={props.news.caption}
        >
          <WhatsappIcon size={32} round={true} size="2.5rem" />
        </WhatsappShareButton>
        <TelegramShareButton
          url={site + props.news.id}
          title={props.news.caption}
        >
          <TelegramIcon size={32} round={true} size="2.5rem" />
        </TelegramShareButton>
      </div>
    );
  } else return <div />;
};

export default Share;
