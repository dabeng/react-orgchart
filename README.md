![OrgChart](http://dabeng.github.io/OrgChart/img/heading.svg)

# [jQuery Version](https://github.com/dabeng/OrgChart)
# [ES6 Version](http://github.com/dabeng/OrgChart.js)
# [Web Components Version](http://github.com/dabeng/OrgChart-Webcomponents)
# [Vue.js Version](https://github.com/dabeng/vue-orgchart)
# [Angular Version -- the most space-saving solution](https://github.com/dabeng/ng-orgchart)

## Features
- expand/collapse nodes
- Allows user to change orgchart structure by drag/drop nodes
- Allows user to edit orgchart
- Supports exporting chart as a picture or pdf document
- Supports pan and zoom
- Allows user to customize the internal structure for every node

## Props
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>chartClass</td>
      <td>string</td>
      <td></td>
      <td>A css class to apply to the chart DOM node.</td>
    </tr>
    <tr>
      <td>containerClass</td>
      <td>string</td>
      <td></td>
      <td>Add an optional extra class name to .orgchart-container It could end up looking like class="orgchart-container xxx yyy".</td>
    </tr>
    <tr>
      <td>collapsible</td>
      <td>boolean</td>
      <td>true</td>
      <td>Allows expanding/collapsing the nodes.</td>
    </tr>
    <tr>
      <td>datasource</td>
      <td>object</td>
      <td></td>
      <td>datasource usded to build out structure of orgchart.</td>
    </tr>
    <tr>
      <td>draggable</td>
      <td>boolean</td>
      <td>false</td>
      <td>Allows dragging/dropping the nodes to the hierarchy of chart.</td>
    </tr>
    <tr>
      <td>multipleSelect</td>
      <td>boolean</td>
      <td>false</td>
      <td>If true, user can select multiple nodes by mouse clicking.</td>
    </tr>
    <tr>
      <td>NodeTemplate</td>
      <td>elementType</td>
      <td></td>
      <td>A Component that provides the node content Markup. This is a useful prop when you want to use your own styles and markup to create a custom orgchart node.</td>
    </tr>
    <tr>
      <td>onClickChart</td>
      <td>function</td>
      <td></td>
      <td>A callback fired when the orgchart is clicking.</td>
    </tr>
    <tr>
      <td>onClickNode</td>
      <td>function</td>
      <td></td>
      <td>A callback fired when the node is clicking.</td>
    </tr>
    <tr>
      <td>pan</td>
      <td>boolean</td>
      <td>false</td>
      <td>If true, the chart can be panned.</td>
    </tr>
    <tr>
      <td>zoom</td>
      <td>boolean</td>
      <td>false</td>
      <td>If true, the chart can be zoomed.</td>
    </tr>
    <tr>
      <td>zoominLimit</td>
      <td>number</td>
      <td>7</td>
      <td>User can zoom the chart at different scales(0.5~7).</td>
    </tr>
    <tr>
      <td>zoomoutLimit</td>
      <td>number</td>
      <td>0.5</td>
      <td>User can zoom the chart at different scales(0.5~7).</td>
    </tr>
  </tbody>
</table>

## Methods
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>expandAllNodes</td>
      <td>User can use this method to expand all the nodes. Sample code: orgchartRef.current.expandAllNodes()</td>
    </tr>
    <tr>
      <td>expandAllNodes</td>
      <td>User can use this method to export orgchart to png org pdf file. Sample code: orgchartRef.current.exportTo(filename, fileextension)</td>
    </tr>
  </tbody>
</table>

## Install
```
npm install @dabeng/react-orgchart
```

## [Demo](https://codesandbox.io/s/react-orgchart-demo-o3nf6)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
