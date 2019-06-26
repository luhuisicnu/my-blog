import Unicode from './Unicode.md'
import PythonPrint from './PythonPrint.md'
import WebImage from './WebImage.md'
import WebDatabase from './WebDatabase.md'
import WebLog from './WebLog.md'
import DeployFlaskWithDocker from './DeployFlaskWithDocker.md'


export default [
    {
        author: '一进制',
        title: '全面拥抱unicode(Python3.0)',
        summary: '本文与你分享Python3的字符串编码改变',
        content: Unicode,
        image: 'pigduck.jpg',
        date: '2018-02-08',
        color: 'blue',
        tag: ['Python', 'Python3', 'unicode'],
    },
    {
        author: '一进制',
        title: 'Print语句改成函数(Python3.0)',
        summary: '本文与你分享Python3对print语法的种种改造',
        content: PythonPrint,
        image: 'snowcabin.jpg',
        date: '2018-02-08',
        color: 'indigo',
        tag: ['Python', 'Python3', 'print'],
    },
    {
        author: '一进制',
        title: 'Web图片的使用场景及其管理',
        summary: '本文与你分享浏览器Html页面中，图片的使用技巧',
        content: WebImage,
        image: 'mountain.jpg',
        date: '2018-01-10',
        color: 'deep-purple',
        tag: ['Web', 'Image'],
    },
    {
        author: '一进制',
        title: 'Web开发中常用的数据关系',
        summary: '本文与你分享在Web开发中常用到的数据关系',
        content: WebDatabase,
        image: 'adventurecave.jpg',
        date: '2018-01-03',
        color: 'purple',
        tag: ['Web', 'Database'],
    },
    {
        author: '一进制',
        title: 'Web应用的日志及其使用场景',
        summary: '本文与你分享Web应用场景下的日志',
        content: WebLog,
        image: 'firepots.jpg',
        date: '2017-12-30',
        color: 'pink',
        tag: ['Web', 'Log'],
    },
    {
        author: '一进制',
        title: '用Docker部署Flask应用',
        summary: '本文与你分享极简Flask应用部署到Docker上的步骤',
        content: DeployFlaskWithDocker,
        image: 'swedishfishing.jpg',
        date: '2017-12-12',
        color: 'red',
        tag: ['Docker', 'Flask', 'Deploy'],
    },

]