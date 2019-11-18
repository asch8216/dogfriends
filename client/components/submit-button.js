import React from 'react'

export default function SubmitButton(props) {
  return (
    <button
      type="button"
      className="add-button"
      onSubmit={() => props.handleSubmit()}
    >
      Submit
    </button>
  )
}
