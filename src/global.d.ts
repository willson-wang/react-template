// 定义ts or tsx中引入可以识别的css文件
declare module '*.module.css' {
    const classes: { readonly [key: string]: string }
    export default classes
}
