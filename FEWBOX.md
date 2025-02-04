# How to use?
## 1. Init
```shell
yarn add sass -D
yarn add @paypal/react-paypal-js # full, lite
yarn add @paypal/paypal-js # web
yarn add jwt-decode
yarn add react-ga4
yarn add react-intl

```
```typescript
import '../style/_root.scss';
```
## 2. Config
Change the variables. ( ***root/_variables.scss*** )

**EG :**
``` scss
$body-color: #e1e1e1;
```

## 3. Use
```tsx
import { Den } from '@fewbox/den'; // @fewbox/den-web @fewbox/den-lite
<Den.Components.VLabel frontColor={Den.Components.ColorType.Primary} caption='Hello, FewBox!' />
```

## 4. Custom Component
```tsx
// Class Component
import * as React from 'react';
import { Den } from '@fewbox/den';
import './index.scss';

export interface IClassComponentProps extends Den.Interface.IBaseProps {
    message: string;
}

export interface IClassComponentStates extends Den.Interface.IBaseStates {
}

export default class ClassComponent extends Den.Components.BaseComponent<IClassComponentProps, IClassComponentStates> {
    render(): React.ReactNode {
        return <Den.Components.VBoundary {...this.props} className={this.getClassName('class-component')} style={this.getStyle()}>
            <Den.Components.VLabel caption={this.props.message} />
        </Den.Components.VBoundary>;
    }
}
// Function Component
import * as React from 'react';
import { Den } from '@fewbox/den';
import './index.scss';

export interface IFunctionComponentProps extends Den.Interface.IBaseProps {
    isSelected: boolean;
}

export interface IFunctionComponentStates extends Den.Interface.IBaseStates {
    isSelected: boolean;
}

const FunctionComponent = (props: IFunctionComponentProps) => {
    const _base = Den.Components.Base(props);
    const [state, setState] = React.useState<IFunctionComponentStates>({ isSelected: props.isSelected });
    return (
        <div className={_base.getClassName(`function-component${state.isSelected ? ' selected' : ''}`)} style={_base.getStyle()} onClick={() => { setState({ ...state, isSelected: !state.isSelected }); }}>
            Click Me
        </div>
    );
}

export default FunctionComponent;
```