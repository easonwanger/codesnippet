/**
 * 
 * 
 * 
（1.）最短时间内找出（2.）响应速度最快且（3.）成功的接口。
 实现 findFatest 函数。

const urls = [
    'https://www.toutiao.com/a',
    'https://www.toutiao.com/b',
    'https://www.toutiao.com/bb',
    'https://www.toutiao.com/d',
    'https://www.toutiao.com/e',
]
findFatest(urls).then(url => console.log(url)
 */

var urls = ['https://zhuanlan.zhihu.com/p/59316214', 'https://pay.zhihu.com/api/js']
findFatest(urls).then(function (url) {
    console.log(url)
})


function findFatest(urls) {

    const promises = []

    urls.forEach(function (url) {

        promises.push(
            fetch(url).then(function (r) {
                if (r.ok && r.status === 200) {
                    return new Promise(function (rs) {
                        rs(r.url)
                    })
                } else {
                    return new Promise(function () {})
                }
            }))

    })

    return Promise.race(promises)
}



var urls = ['https://zhuanlan.zhihu.com/p/59316214', 'https://pay.zhihu.com/api/js']
findFatest2(urls).then(function (url) {
    console.log(url)
})

function findFatest2(urls) {


    return new Promise(function (rs, rj) {

        let resolved = false

        urls.forEach(function (url) {

            fetch(url).then(function (r) {
                if (r.ok && r.status === 200&& !resolved ) {
                    resolved = true
                    rs(url)
                }
            })


        })
    })
}
