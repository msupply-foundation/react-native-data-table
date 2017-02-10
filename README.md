# react-native-data-table
A React Native data table written purely in JSX with React.
## Installation
`npm install --save react-native-data-table`
## Usage
react-native-data-table provides a number of components for constructing a table through composition.

![data table example](https://cloud.githubusercontent.com/assets/7684221/22765506/8e24ca76-eed5-11e6-97fe-5b0da7687aca.png)

### DataTable
This component acts as a wrapper around the React Native ListView component. All the other components in this library should be used in the renderRow and renderRow and renderHeader.

| Prop Name          | Type    | Description                                                               |
| ------------------ | ------- | ------------------------------------------------------------------------- |
| ListView Props     | -       | Will pass through any extra props to ListView                             |
| listViewStyle      | style   | Will override styling of the ListView within the DataTable                |
| style              | style   | Style of the DataTable container (View)                                   |
| dataSource         | object (required) | See [ListView](https://facebook.github.io/react-native/docs/listview.html) |
| renderRow          | func (required)   | See [RenderRow](https://facebook.github.io/react-native/docs/listview.html#renderrow). Function can return anything, but the Cell components in this library are to make it easy for constructing a table  |
| renderHeader       | func    | Provide this function with appropriate return to make a table header      |
| refCallback        | func    | CallBack for utilising reference of the inner TextInput                   |

### Cell
Renders a Cell that supports having a string as children, or any component.

`<Cell>Hello 1234</Cell>`

| Prop Name     | Type    | Description                                                               |
| ------------- | ------- | ------------------------------------------------------------------------- |
| textStyle     | style   | Will override styling of the Text label within the button                 |
| style         | style   | Will override styling of the TouchableHighlight enclosing the button      |
| width         | number  | Gives width relative to other cells in the same container (via flexbox)   |
| children      | any     | Content of the cell; string, number or any component                      |
| numberOfLines | number  | Defines the number of lines in the cell that text should use              |

### CheckableCell
Renders a CheckableCell that renders either renderIsChecked or renderIsNotChecked when isChecked is true or false respectively. Whole cell returned is pressable. Callback should affect state of Parent in some way that keeps the state of parent in sync with state of the CheckableCell. Kept separate to maintain responsiveness of the cell.

| Prop Name          | Type    | Description                                                               |
| ------------------ | ------- | ------------------------------------------------------------------------- |
| isChecked          | boolean | Used to set the initial state of the cell when the component mounts or rerenders (e.g. table sort order change) |
| isDisabled         | boolean | Will cause renderDisabled to be shown in the cell                         |
| style              | style   | Style of the CheckableCell (View props)                                   |
| width              | number  | Gives width relative to other cells in the same container (via flexbox)   |
| onPress            | func    | CallBack Function for handling user pressing CheckableCell                |
| renderIsChecked    | object  | Object is rendered as child in CheckableCell if checked                   |
| renderIsNotChecked | object  | Object is rendered as child in CheckableCell if not checked               |
| renderDisabled     | object  | Object is rendered as child in CheckableCell if isDisabled is true        |

### EditableCell
Renders a cell with an editable text input. Has own state for managing TextInput content and has onEndEditing callback for utilising user input.

| Prop Name          | Type    | Description                                                               |
| ------------------ | ------- | ------------------------------------------------------------------------- |
| TextInput Props    | -       | Will pass through any extra props to TextInput                            |
| textStyle          | style   | Will override styling of the TextInput within the button                 |
| style              | style   | Style of the EditableCell (View props)                                   |
| width              | number  | Gives width relative to other cells in the same container (via flexbox)   |
| onEndEditing       | func    | Will be called with 2 params: target and the newValue on end of editing. This function should run code to persist the change to local storage                                                     |
| target             | object  | Data object of the row/record being edited                                |
| value              | string or number  | Provides initial value. Will change what cell shows if prop changes|
| refCallback        | func    | CallBack for utilising reference of the inner TextInput                   |

### Header
A container for header cells, should be the outermost component returned in the renderHeader function given to the DataTable renderHeader prop.
### HeaderCell
Renders a headerCell that supports being a plain View with Text or being a TouchableOpacity (with callback). In the latter case sort arrows will be rendered and controlled with isSelected and isAscending props.
This could also be thought of as "column headers", as that is what this component sets out to ultimately achieve.

| Prop Name          | Type    | Description                                                               |
| ------------------ | ------- | ------------------------------------------------------------------------- |
| TouchableOpacity Props | -   | Will pass through any extra props to TouchableOpacity                     |
| textStyle          | style   | Will override styling of the Text label within the HeaderCell                 |
| style              | style   | Will override styling of the TouchableHighlight enclosing the button      |
| width              | number  | Gives width relative to other cells in the same container (via flexbox)   |
| onPress            | func    | CallBack Function for handling user pressing headerCell. Should change some parent state that affects the following 2 props                    |
| isSelected         | Boolean  | When false up+down sort arrows renderHeader, otherwise as below          |
| isAscending        | Boolean  | Sort arrow up if true, down if false.                                    |

### Row
A container to be used in renderRow function in DataTable renderRow Prop. Has internal state that knows whether the row is expanded or not. Toggled on press. Will only render an expansion if provided.

```
renderRow(record) {
  <Row>
    <Cell>record.code</Cell>
    <Cell>record.name</Cell>
    <EditableCell
      value={record.quantity}
    />
  </Row>
}
```

| Prop Name       | Type    | Description                                                               |
| --------------- | ------- | ------------------------------------------------------------------------- |
| style           | style   | Will override styling of the TouchableHighlight enclosing the button      |
| children        | any     | Content of the Row; construct with Cell, EditableCell, etc.               |
| onPress         | func    | CallBack for doing anything on the press of the row. Also toggles expansion  |
| isExpanded      | boolean | If true, the expansion defined renderExpansion will be shown below this row, moving other rows down.                             |
| renderExpansion | func    | A function that should return an Expansion component with custom content  |

### Expansion
Literally just a wrapper for View. To be used in the Row prop 'renderExpansion'. Made basically just for consistent semantics.

| Prop Name          | Type    | Description                                                               |
| ------------------ | ------- | ------------------------------------------------------------------------- |
| View Props         | -       | Will pass through any extra props to View                                 |

### TableButton
Like expansion, this is essentially just a wrapper around TouchableOpacity with a default flex value of 1. Which I believe became redundant at some point in RN development.
