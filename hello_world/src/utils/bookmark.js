export const bookmark = {
    a: "啊-",
    b: "吧-",
    c: "擦-",
    d: "打-",
    e: "恶-",
    f: "发-",
    g: "噶-",
    h: "哈-",
    j: "击-",
    k: "卡-",
    l: "啦-",
    m: "吗-",
    n: "那-",
    o: "哦-",
    p: "爬-",
    q: "七-",
    r: "绕-",
    s: "撒-",
    t: "它-",
    w: "哇-",
    x: "下-",
    y: "压-",
    z: "咋-"
}

const get_bookmark_list = ()=>{
    var bm_list = []
    for(let key in bookmark){
        bm_list.push(bookmark[key])
    }
    return bm_list
}
export const bookmark_list = get_bookmark_list()


/**
 * 键值调换
 * @returns list
 */
const get_bootmark_reverse = ()=>{
    var re_list = {}
    for(let key in bookmark){
        re_list[bookmark[key]] = key
    }
    return re_list
}
export const bootmark_reverse = get_bootmark_reverse()
