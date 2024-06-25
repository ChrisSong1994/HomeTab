import React, { Fragment, useEffect, useState } from "react";

import { imageLoad, to } from "@/utils";
import { LoadingOutlined } from "@ant-design/icons";

/**
 * 优先加载图片，图片获取不到则使用背景加文字
 */
const LinkImage = (props) => {
  const { link } = props;
  const [loading, setLaoding] = useState(false);

  const handleImageLoad = async () => {
    setLaoding(true);
    await to(imageLoad(link.icon));
    setLaoding(false);
  };

  useEffect(() => {
    handleImageLoad(link);
  }, [link]);

  return (
    <Fragment>
      {loading ? <LoadingOutlined /> : <img src={link.icon} alt={link.title} />}
    </Fragment>
  );
};

export default LinkImage;
