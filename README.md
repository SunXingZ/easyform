# easyform

#### 基于antd二次封装的表单管理组件

> 

[![NPM](https://img.shields.io/npm/v/easyform.svg)](https://www.npmjs.com/package/easyform) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## 功能特性

#### 1、label和表单元素支持上下、左右排列
#### 2、支持编辑、预览、禁用等几种模式
#### 3、支持根据依赖字段动态加载options
#### 4、表单右侧和底部支持显示扩展信息
#### 5、支持根据依赖字段显示和隐藏

## 安装

```bash
npm install --save https://github.com/SunXingZ/easyform.git or yarn add https://github.com/SunXingZ/easyform.git
```

## API

| 参数 | 说明 | 类型 | 默认值 | 示例 |
| --- | --- | --- | --- | --- |
| name | Form.Item的`name`属性 | string | - | - |
| label | Form.Item的`label`属性 | ReactNode | - | - |
| preview | 表单预览模式 | boolean \| ReactNode \| ({ value, options, elementType }) => ReactNode | - | - |
| elementType | 表单类型 | string | - | 'input' |
| elementProps | 作用于表单元素的props，例如：`disabled`，`placeholder`等 | object | {} | - |
| itemProps | 作用于Form.item的props，例如：`rules`，`extra`等 | object | {} | { rules: [ { required: true, message: '请输入' } ] } |
| options | 当elementType为`select`，`radio`，`checkbox`等类型时需要配置 | string \| object \| array，为string时作为接口地址。为object时object.url作为接口地址，object.labelKey指定option.label如何取值，object.valueKey指定option.value如何取值。为array时作为options选项 | [] | 详见：example下App.js中的示例 |
| rightExtra | 表单右侧显示的信息 | ReactNode | - | <Button>获取验证码</Button> |
| description | 表单底部显示的信息，位于Form.item的`extra`下 | ReactNode | - | 一段描述信息 |
| shouldUpdate | 此属性会覆盖Form.Item的`shouldUpdate`，作为控制表单显示隐藏的配置。 | object | {} | { age: 18, type: [1, 2] } 表示`age`字段值为18且`type`字段值为1或2时表单会显示，否则隐藏。|


## 温馨提示

#### 这个库目前还在开发中，随时可能发生重大变动，如使用请谨慎。

## License

MIT © [SunXingZ](https://github.com/SunXingZ)
