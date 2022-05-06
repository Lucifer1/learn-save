const ejs = require('ejs')
const fs = require('fs')

generateFile = (tmpFileName, targetFileName, dir) => {
  const template = fs.readFileSync(__dirname + `/template/${tmpFileName}`, 'utf-8')
  var result = ejs.render(template, { fileName: targetFileName })
  const foldUrl = `${process.cwd()}/src/${dir}/`
  try {
    // 没有异常，文件已经创建，提示用户改文件已经创建
    let _stat = fs.stat(foldUrl, (err, stats) => {
      if (!stats) {
        fs.mkdir(foldUrl, { recursive: true }, (err) => {
          fs.writeFile(foldUrl + targetFileName, result, 'utf8', function () {})
        })
      } else {
        fs.writeFile(foldUrl + targetFileName, result, 'utf8', function () {})
      }
    });
  } catch (err) {
    console.log('>>>', 'err', err)
  }
}

const args = [{name: 'zjm'}]

generateFile('store.ejs', 'index', `store/${args[0].name}`)
generateFile('page.ejs', `${args[0].name}`, 'pages')
generateFile('type.ejs', `${args[0].name}`, 'types')
generateFile('constant.ejs', `${args[0].name}`, 'contants')
generateFile('service.ejs', `${args[0].name}`, 'services')
generateFile('component.ejs', 'index', `components/${args[0].name}`)
generateFile('mock.ejs', `${args[0].name}`, 'mock')