import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type EditableSpanTypeProps = {
    title: string
    changTitle: (title: string) => void
}
export const EditableSpan = (props: EditableSpanTypeProps) => {

    const [error, setError] = useState<string>('')
    const [newTitle, setTitle] = useState<string>(props.title)
    const [edit, setEdit] = useState(true)

    const onChangHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
        console.log(newTitle)
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            setEdit(!edit)
            addTask()
        }
    }
    const addTask = () => {
        let changTitle = newTitle.trim()
        if (changTitle !== '') {
            props.changTitle(changTitle)
        } else {
            setError("You dont enter new text")
            setTimeout(() => {
                setError("")
            }, 1700)
            setTitle(props.title)
        }
    }


    const editChangHandler = () => {
        setEdit(!edit)
        addTask()

    }

    const onFocusChengError = () => {
        setError('')
    }
    return (<>
        {edit ?
            <span
                onDoubleClick={editChangHandler}>
                {props.title}
            </span>
            :
            <input
                onKeyDown={onKeyPressHandler}
                value={newTitle}
                onBlur={editChangHandler}
                onChange={onChangHandler}
                className={error ? 'error' : ''}
                onFocus={onFocusChengError}
                autoFocus
                type='text'/>
        }

        {error && <div className='error-message'>{error}</div>}

    </>)

}