import useUpdate from "../../hooks/useUpdate"

export default function UserUpdate ({ response }) {
    let initialData = {
        username: '',
        email: '',
        phoneNumber: '',
        rol: '',
    }

    const onValidate = (form) => {
        let errors = {}
        let regexDescription = /^[\s\S]{8,300}$/

        if (!regexDescription.test(form.inDescription)) {
            errors.inDescription = 'just 8 to 300 caracteres'
        }

        return errors
    }

    const { form, errors, handleChange, handleSubmit } = useUpdate(initialData, onValidate, `incomes/${id}`,
        'Income was Updated'
    )

    return (
        <div>
            <form className="view-content" onSubmit={handleSubmit} >
                <h2>Update Income</h2>
                <div className="view-input-container">
                    <input type="text"
                    value={form.inTitle}
                    name="inTitle"
                    onChange={handleChange}
                    />
                </div>
                <div className="view-input-container">
                    <input type="Number"
                    value={form.inAmount}
                    name="inAmount"
                    onChange={handleChange}
                    />
                </div>
                <div className="view-input-container">
                    <textarea name="inDescription"
                    value={form.inDescription}
                    cols="30" rows="10"
                    onChange={handleChange}
                    ></textarea>
                    {errors.inDescription && <p className="modal-error">{errors.inDescription}</p>}
                </div>
                <div className="view-btn-submit">
                    <button type="submit">Update</button>
                </div>
            </form>
        </div>
    )
}