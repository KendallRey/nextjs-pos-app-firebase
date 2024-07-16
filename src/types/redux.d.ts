/**
 * Wrapper for Form
 * @typeParam T - Form type
 */
type IReduxFormState<T> = {
  error: Partial<Record<keyof T, string>>;
} & Partial<T>;

type RCE<T = HTMLInputElement> = React.ChangeEvent<T>;
