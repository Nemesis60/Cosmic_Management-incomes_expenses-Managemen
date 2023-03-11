import useUpdate from "../../hooks/useUpdate"

export default function ModalFormUserUpdate({ open, onClose, user }) {
    let initialData = {
        username: user?.user?.username,
        email: user?.user?.email,
        phoneNumber: user?.user?.phoneNumber,
    }

    const onValidate = (form) => {
        let errors = {}

        return errors
    }

    const handleCancel = () => {
        initialData = {
            username: '',
            email: '',
            password: '',
            phoneNumber: '',
            imagePath: ''
        }
        onClose()
    }

    const { form, errors, handleChange, handleSubmit } = useUpdate(initialData, onValidate, `users/${user?.user?._id}`,
        'Your profile was Updated'
    )

    if (!open) return null

    return (
        <div className="overlay" >
            <div className="modal">
                <form className="form" onSubmit={handleSubmit} autoComplete="off" >
                    <div className="form-input">
                        <label htmlFor="title">Username</label>
                        <input
                            value={form.username}
                            onChange={handleChange}
                            name="username"
                            type="text" id="username" placeholder="Username" />
                    </div>
                    <div className="form-input">
                        <label htmlFor="phone">Phone Number</label>
                        <input
                            value={form.phoneNumber}
                            onChange={handleChange}
                            name="phoneNumber"
                            type="text" id="phone" placeholder="Phone Number" />
                    </div>
                    <div className="form-btn">
                        <button className="modal-btn" type="submit">Send</button>
                        <button className="modal-btn"
                            onClick={handleCancel}
                        >Close</button>
                    </div>
                </form>
            </div>
            
        </div>
    )
}