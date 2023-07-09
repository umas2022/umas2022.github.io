
// import image_list from "@/assets/list/image_list.json"
// import sticker_list from "@/assets/list/sticker_list.json"
// import tag_list from "@/assets/list/tag_list.json"

// import { bookmark_list } from "./bookmark.js"

import { legal_image,legal_video } from "./const.js"

/**
 * 序号转换为pack名
 * @param {number} num 
 * @returns 
 */
export function pack_name(num) {
    if(JSON.stringify(num).includes("pack")){
        return num
    }
    const num_fill = JSON.stringify(num).padStart(4, "0")
    return "pack" + num_fill
}


/**
 * 图片名拆分tag
 * @param {string} name 
 * @returns 
 */
export function get_tag_list(name) {
    name = name.split(".").slice(0, -1).join(".")
    let tag_list = name.split("_").slice(1)

    tag_list = tag_list.filter(item => item != "")

    return tag_list
}





/**
 * 判断资源类型(图片/视频/都不是)
 * @returns "image" | "video" | "none"
 */
export function url_type(url){
    const extension = url.split('.').pop()
    if (legal_image.includes(extension)){
        return "image"
    } else if(legal_video.includes(extension)){
        return "video"
    } else{
        return "none"
    }
}