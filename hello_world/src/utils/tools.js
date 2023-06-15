
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
 * 生成tag列表,用于el-autocomplete
 * @returns 
 */
// export function build_suggestions() {
//     let sug_list = []
//     for (let index in tag_list) {
//         sug_list.push({ value: tag_list[index] })
//     }
//     return sug_list
// }

/**
 * 生成tag列表,带字母分隔,用于显示
 * @returns 
 */
// export function tag_list_bookmark() {
//     const new_list = [...tag_list, ...bookmark_list]
//     const collator = new Intl.Collator('zh', { sensitivity: 'base' });
//     return new_list.sort(collator.compare)
// }


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