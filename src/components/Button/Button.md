# Button Component Documentation

## Overview
The `Button` component is a customizable and reusable UI button designed for flexibility and accessibility. It supports various styles and properties, allowing developers to integrate it seamlessly into their projects.

## Installation
Ensure you have React installed in your project. Then, import the `Button` component:

```tsx
import Button from "./Button";
```

## Props

| Prop          | Type                                       | Default   | Description |
|--------------|------------------------------------------|-----------|-------------|
| `color`      | `string`                                 | `"blue"`  | Background color of the button. |
| `width`      | `string`                                 | `"100px"` | Width of the button. |
| `height`     | `string`                                 | `"40px"`  | Height of the button. |
| `text`       | `string`                                 | `"Click me"` | Text displayed on the button. |
| `onClick`    | `() => void`                             | `undefined` | Function to execute when the button is clicked. |
| `disabled`   | `boolean`                                | `false`    | Disables the button if `true`. |
| `borderRadius` | `number`                               | `15`       | Border radius for rounded corners. |
| `className`  | `string`                                 | `""`       | Additional class names for custom styling. |
| `...rest`    | `React.ButtonHTMLAttributes<HTMLButtonElement>` | N/A       | Allows additional HTML attributes. |

## Usage
### Basic Example
```tsx
<Button text="Submit" onClick={() => alert("Button clicked!")} />
```

### Custom Styling
```tsx
<Button color="green" width="150px" height="50px" borderRadius={10} text="Confirm" />
```

### Disabled Button
```tsx
<Button text="Disabled" disabled={true} />
```

### Using Additional HTML Attributes
```tsx
<Button text="Login" className="custom-button" data-testid="login-button" />
```

## Accessibility
- The button includes the `aria-disabled` attribute when `disabled` is set to `true`.
- Uses `type="button"` to prevent unintended form submissions.

## Customization
You can apply custom styles using the `className` prop or extend styles inline within the component.

---

For any issues or contributions, refer to the project's repository.

