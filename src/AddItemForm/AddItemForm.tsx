import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
    AddItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== '') {
            props.AddItem(title)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onChangHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)

    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {

        if (event.key === 'Enter') {
            addTask()
        }
    }

    const onFocusChangError = () => {
        setError(null)
    }

    return (
        <div>
            <input value={title}
                   onFocus={onFocusChangError}
                   onChange={onChangHandler}
                   onKeyDown={onKeyPressHandler}
                   className={error ? 'error' : ''}
            />
            <button
                onClick={addTask}>+
            </button>
            {error && <div className='error-message'>{error}</div>}
        </div>
    )
}