### npm依赖：antd、events、lodash

### 一、功能特性

#### 1、label和表单元素支持上下、左右排列
#### 2、支持编辑、预览、禁用等几种模式
#### 3、支持根据依赖字段动态加载options
#### 4、表单右侧和底部支持显示扩展信息
#### 5、支持根据依赖字段显示和隐藏


### 二、Schema配置与说明
```
{
    name: '',
    // name：表单的name，字符串，必填

    label: '',
    // label：表单的label，字符串或元素，非必填

    elementType: '',
    // 表单类型名称，input、number、select等，小写英文字符串，必填
    // 当elementType为上传类的组件时，value需要转为字符串，多文件上传每个url用逗号隔开

    elementProps: {},
    // antd 表单元素的props，对象类型，非必填

    itemProps: {},
    // antd Form.Item的props，对象类型，非必填

    options: '',
    // options：select，radio等元素的选项，数组或字符串
    // 为字符串时作为接口名称+query使用，query部分name=‘${user}’表示需要监听同一个form下面的user字段的值，当变更时‘${user}’会被替换为实际的字段值并重新加载options
    // 为数组时应配置为{ label: '', value: '' }格式的数组

    rightExtra: '',
    // 表单元素右侧显示的额外信息，字符串或其他元素，非必填

    bottomExtra: '',
    // 表单元素底部显示的额外信息，字符串或其他元素，非必填

    description: '',
    // 显示在最底部的描述信息，字符串或元素，非必填

    shouldUpdate: {},
    // 控制表单显示与隐藏，对象类型，非必填， 示例：{ age: 18, type: [1, 2] } 表示age字段值为18且type字段值为1或2时表单会显示，否则隐藏。
}
```
