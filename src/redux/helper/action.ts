import { PayloadAction } from "@reduxjs/toolkit";
import { REDUX } from "../constant/slice";
import { clearDataArrayOf } from "@/components/helper/array";
import { IModel } from "@/model/base/model";

/**
 * Generates a function to set a specific field in the state.
 * @template T - The type of the state.
 * @template D - The type of the payload.
 * @param field - The field to be set in the state.
 * @returns A function that takes the state and action, and sets the specified field.
 */
export const setAction = <T extends Record<string, any>, D = any>(field: keyof T) => {
  return (state: T, action: PayloadAction<D>) => {
    state[field] = action.payload as T[keyof T];
  };
};

/**
 * Generates a function to clear a specific field in the state.
 * @template T - The type of the state.
 * @param field - The field to be cleared in the state.
 * @returns A function that takes the state and clears the specified field.
 */
export const clearAction = <T extends Record<string, any>>(field: keyof T) => {
  return (state: T) => {
    state[field] = undefined as T[keyof T];
  };
};

/**
 * Generates view-related actions.
 * @template T - The type of the view name.
 * @template D - The type of the state.
 * @param INITIAL_STATE - The initial state for the views.
 * @returns An object containing setView and resetViews functions.
 */
export const viewActions = <T extends string, D extends Record<string, any>>(INITIAL_STATE: D) => {
  /**
   * Sets the view state.
   * @param state - The current state.
   * @param action - The action containing view name and open state.
   */
  const setView = (state: Record<string, any>, action: PayloadAction<{ view: T; open: boolean }>) => {
    const { payload } = action;
    const { view, open } = payload;
    state[view] = open;
  };

  /**
   * Resets the view state to the initial state.
   * @param state - The current state.
   */
  const resetViews = (state: Record<string, any>) => {
    state = INITIAL_STATE;
  };

  return {
    setView,
    resetViews,
  };
};

/**
 * Sets the form state with the provided payload.
 * @template T - The type of the form state.
 * @param state - The current form state.
 * @param action - The action containing the payload to set.
 * @returns The updated form state.
 */
export const setFormAction = <T>(state: IReduxFormState<T>, action: PayloadAction<Record<string, any>>) => {
  const { payload } = action;
  return { ...state, ...payload, error: {} };
};

/**
 * Edits the form state with the provided payload and clears the error for the edited field.
 * @template T - The type of the form state.
 * @param state - The current form state.
 * @param action - The action containing the payload to edit.
 * @returns The updated form state.
 */
export const editFormAction = <T>(state: IReduxFormState<T>, action: PayloadAction<Record<string, any>>) => {
  const { payload } = action;
  const error = { ...state.error, [payload[REDUX.FIELD.KEY]]: "" };
  return { ...state, error, ...payload };
};

/**
 * Sets the form error state with the provided payload.
 * @template T - The type of the form state.
 * @param state - The current form state.
 * @param action - The action containing the error payload to set.
 */
export const setFormErrorAction = <T>(state: IReduxFormState<T>, action: PayloadAction<Record<string, any>>) => {
  const { payload } = action;
  state.error = payload as any;
};

/**
 * Clears the form error state.
 * @template T - The type of the form state.
 * @param state - The current form state.
 */
export const clearFormErrorAction = <T>(state: IReduxFormState<T>) => {
  state.error = {};
};

/**
 * Creates an action to set a field in the state.
 * Merges the payload with the existing field value and resets the error.
 *
 * @template T - The type of the state object.
 * @param {keyof T} field - The field in the state to be set.
 * @returns {Function} The set field action function.
 */
export const setFieldAction = <T>(field: keyof T) => {
  const setField = (state: T, action: PayloadAction<Record<string, any>>) => {
    const { payload } = action;
    state[field] = { ...state[field], ...payload, error: {} };
  };
  return setField;
};

/**
 * Creates an action to edit a field in the state.
 * Merges the payload with the existing field value and updates the error.
 *
 * @template T - The type of the state object.
 * @param {keyof T} field - The field in the state to be edited.
 * @returns {Function} The edit field action function.
 */
export const editFieldAction = <T extends Record<string, any>>(field: keyof T) => {
  const editField = (state: T, action: PayloadAction<Record<string, any>>) => {
    const { payload } = action;
    const error = { ...state[field].error, [payload[REDUX.FIELD.KEY]]: "" };
    state[field] = { ...state[field], error, ...payload };
  };
  return editField;
};

/**
 * Creates an action to clear a field in the state.
 * Resets the field to its initial state.
 *
 * @template T - The type of the state object.
 * @param {T} initialState - The initial state of the field.
 * @param {keyof T} field - The field in the state to be cleared.
 * @returns {Function} The clear field action function.
 */
export const clearFieldAction = <T>(initialState: T, field: keyof T) => {
  const clearField = (state: T) => {
    state[field] = initialState[field];
  };
  return clearField;
};

/**
 * Creates an action to set an error for a field in the state.
 *
 * @template T - The type of the state object.
 * @param {keyof T} field - The field in the state to set the error for.
 * @returns {Function} The set field error action function.
 */
export const setFieldErrorAction = <T extends Record<string, any>>(field: keyof T) => {
  const setFieldError = (state: T, action: PayloadAction<Record<string, any>>) => {
    const { payload } = action;
    state[field].error = payload;
  };
  return setFieldError;
};

/**
 * Creates an action to clear the error for a field in the state.
 *
 * @template T - The type of the state object.
 * @param {keyof T} field - The field in the state to clear the error for.
 * @returns {Function} The clear field error action function.
 */
export const clearFieldErrorAction = <T extends Record<string, any>>(field: keyof T) => {
  const clearFieldError = (state: T) => {
    state[field].error = {};
  };
  return clearFieldError;
};

/**
 * Set array of object to object array field.
 * @param field Object array field name.
 */
export const setArrayAction = <T extends Record<string, any>>(field: keyof T) => {
  return (state: T, action: PayloadAction<IModel[]>) => {
    const { payload } = action;
    state[field] = payload as T[keyof T];
  };
};

/**
 * Adds/Selects or Removes/unselects object to list.
 * @note Object to add / remove must have `id` field
 * @param  field Array field name.
 */
export const selectItemAction = <T extends Record<string, any>, D extends IModel>(field: keyof T) => {
  return (state: T, action: PayloadAction<{ item: D; select?: boolean }>) => {
    const { payload } = action;
    const { item, select } = payload;
    if (select) {
      const cleanList = clearDataArrayOf(state[field], [item]);
      cleanList.push(item);
      state[field] = cleanList as T[keyof T];
    } else {
      const cleanList = clearDataArrayOf(state[field], [item]);
      state[field] = cleanList as T[keyof T];
    }
  };
};

type IProcessFormActionOptions<T> = {
  keyRelations?: IFormKeysRelation<T>;
};

/**
 * Same function of `editFormAction`, with `options` for processing fields
 * @param initialState Initial state object of the form
 * @param keyRelations Arrays of field keys to clear when invoked, see example below.
 * @example
 * ```json
 * {
 *   "campus": ["building_id", "room_id"],
 * }
 * ```
 * If `campus` is passed as latest key, clears the `building_id` and `room_id` fields base on their `initialState` value
 */

export const processFormAction = <T>(initialState: T, options?: IProcessFormActionOptions<T>) => {
  const keysToClear = options?.keyRelations;
  const setFormFunction = (state: IReduxFormState<T>, action: PayloadAction<Record<string, any>>) => {
    const { payload: initialPayload } = action;

    const { [REDUX.FIELD.KEY]: _key, ...payload } = initialPayload;
    const key = _key as keyof T;
    // Overrides key pair values
    let fieldToClears = {};
    // Maps key to clear if found in the options
    if (keysToClear && key in keysToClear) {
      keysToClear[key]?.forEach((item) => {
        fieldToClears = { ...fieldToClears, [item]: initialState[item] };
      });
    }
    const error = { ...state.error, [key]: "", ...fieldToClears };
    return { ...state, error, ...payload, ...fieldToClears };
  };
  return setFormFunction;
};
