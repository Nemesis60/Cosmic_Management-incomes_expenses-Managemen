import useUpdate from "../../hooks/useUpdate"

export default function ExpenseUpdate({ response, id, user }) {

    let initialData = {
        UserCreator: user,
        outTitle: response?.expense?.outTitle,
        outAmount: response?.expense?.outAmount,
        outDescription: response?.expense?.outDescription
    }

    const onValidate = (form) => {
        let errors = {}
        let regexDescription = /^[\s\S]{8,300}$/

        if (!regexDescription.test(form.outDescription)) {
            errors.outDescription = 'just 8 to 300 caracteres'
        }

        return errors
    }

    const { form, errors, handleChange, handleSubmit } = useUpdate(initialData, onValidate, `expenses/${id}`,
        'Expense Updated'
    )

    return (
        <div>
            <form className="view-content" onSubmit={handleSubmit} >
                <h2>Update expense</h2>
                <div className="view-input-container">
                    <input type="text"
                        value={form.outTitle}
                        onChange={handleChange}
                        name="outTitle"
                    />
                </div>
                <div className="view-input-container">
                    <input type="Number"
                        value={form.outAmount}
                        name="outAmount"
                        onChange={handleChange}
                    />
                </div>
                <div className="view-input-container">
                    <textarea name="outDescription"
                        value={form.outDescription}
                        cols="30" rows="10"
                        onChange={handleChange}
                    ></textarea>
                    {errors.outDescription && <p className="modal-error">{errors.outDescription}</p>}
                </div>
                <div className="view-btn-submit">
                    <button type="submit">Update</button>
                </div>
            </form>
        </div>
    )
}