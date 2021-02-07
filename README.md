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
| --- | --- | --- | --- | --- | --- |
| name | Form.Item的`name`属性 | string | - | - |
| label | Form.Item的`label`属性 | ReactNode | - | - |
| preview | 表单预览模式 | boolean \| ReactNode \| ({ value, options, elementType }) => ReactNode | - | - |
| elementType | 表单类型 | string | - | 'input' |
| elementProps | 作用于表单元素的props，例如：`disabled`，`placeholder`等 | object | {} | - |
| itemProps | 作用于Form.item的props，例如：`rules`，`extra`等 | object | {} | `{ rules: [ { required: true, message: '请输入' } ] }` |
| options | 当elementType为`select`，`radio`，`checkbox`等类型时需要配置 | string \| array，为string时作为接口地址。为array时作为options选项 | [] | `string = https://api.xxx.com/v1/getOptions?type=1&name=user array = [ { label: '张三', value: 'zhangsan' } ]` |
| rightExtra | 表单右侧显示的信息 | ReactNode | - | `<Button>获取验证码</Button>` |
| description | 表单底部显示的信息，位于Form.item的`extra`下 | ReactNode | - | `一段描述信息` |
| shouldUpdate | 此属性会覆盖Form.Item的`shouldUpdate`，作为控制表单显示隐藏的配置。 | object | {} | `{ age: 18, type: [1, 2] }` 表示`age`字段值为18且`type`字段值为1或2时表单会显示，否则隐藏。|

### Form

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| colon | 配置 Form.Item 的 `colon` 的默认值。表示是否显示 label 后面的冒号 (只有在属性 layout 为 horizontal 时有效) | boolean | true |  |
| component | 设置 Form 渲染元素，为 `false` 则不创建 DOM 节点 | ComponentType \| false | form |  |
| fields | 通过状态管理（如 redux）控制表单字段，如非强需求不推荐使用。查看[示例](#components-form-demo-global-state) | [FieldData](#FieldData)\[] | - |  |
| form | 经 `Form.useForm()` 创建的 form 控制实例，不提供时会自动创建 | [FormInstance](#FormInstance) | - |  |
| initialValues | 表单默认值，只有初始化以及重置时生效 | object | - |  |
| labelAlign | label 标签的文本对齐方式 | `left` \| `right` | `right` |  |
| labelCol | label 标签布局，同 `<Col>` 组件，设置 `span` `offset` 值，如 `{span: 3, offset: 12}` 或 `sm: {span: 3, offset: 12}` | [object](/components/grid/#Col) | - |  |
| layout | 表单布局 | `horizontal` \| `vertical` \| `inline` | `horizontal` |  |
| name | 表单名称，会作为表单字段 `id` 前缀使用 | string | - |  |
| preserve | 当字段被删除时保留字段值 | boolean | true | 4.4.0 |
| requiredMark | 必选样式，可以切换为必选或者可选展示样式。此为 Form 配置，Form.Item 无法单独配置 | boolean \| `optional` | true | 4.6.0 |
| scrollToFirstError | 提交失败自动滚动到第一个错误字段 | boolean \| [Options](https://github.com/stipsan/scroll-into-view-if-needed/tree/ece40bd9143f48caf4b99503425ecb16b0ad8249#options) | false |  |
| size | 设置字段组件的尺寸（仅限 antd 组件） | `small` \| `middle` \| `large` | - |  |
| validateMessages | 验证提示模板，说明[见下](#validateMessages) | [ValidateMessages](https://github.com/react-component/field-form/blob/master/src/utils/messages.ts) | - |  |
| validateTrigger | 统一设置字段校验规则 | string \| string\[] | `onChange` | 4.3.0 |
| wrapperCol | 需要为输入控件设置布局样式时，使用该属性，用法同 labelCol | [object](/components/grid/#Col) | - |  |
| onFieldsChange | 字段更新时触发回调事件 | function(changedFields, allFields) | - |  |
| onFinish | 提交表单且数据验证成功后回调事件 | function(values) | - |  |
| onFinishFailed | 提交表单且数据验证失败后回调事件 | function({ values, errorFields, outOfDate }) | - |  |
| onValuesChange | 字段值更新时触发回调事件 | function(changedValues, allValues) | - |  |

## 温馨提示

#### 这个库目前还在开发中，随时可能发生重大变动，如使用请谨慎。

## License

MIT © [SunXingZ](https://github.com/SunXingZ)
