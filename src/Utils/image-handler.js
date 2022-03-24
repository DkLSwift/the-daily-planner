
const ImgHandler = (imgPath) => {
    let img_path = ''
    try {
        img_path = require(`../img/${imgPath}.jpg`)
    } catch(err) {
        img_path = require("../img/no_image.jpg")
    }
    return img_path
}

export default ImgHandler