import useForm from "../../hooks/useForm"

export default function ModalUserForm({ open, onClose }) {
    let initialData = {
        username: '',
        email: '',
        password: '',
        phoneNumber: '',
        rol: ''
    }

    const onValidate = (form) => {
        let errors = {}
        let regexEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

        if (!form.username.trim()) {
            errors.username = 'Please fill this input'
        }
        if (!form.email.trim()) {
            errors.email = 'Please fill this input'
        } else if (!regexEmail.test(form.email)) {
            errors.email = '"Email" is not valid'
        }
        if (!form.password.trim()) {
            errors.password = 'Please fill this input'
        }
        if (!form.phoneNumber.trim()) {
            errors.phoneNumber = 'Please fill this input'
        }
        if (!form.rol.trim()) {
            errors.rol = 'Please choose a rol'
        }

        return errors
    }

    const handleCancel = () => {
        initialData = {
            username: '',
            email: '',
            password: '',
            phoneNumber: '',
            rol: ''
        }
        onClose()
    }

    const { form, errors, handleChange, handleSubmit } = useForm(initialData, onValidate, 'users',
        'User was Created'
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
                        {errors.username && <p className="modal-error" >{errors.username}</p>}
                    </div>
                    <div className="form-input">
                        <label htmlFor="email">Email</label>
                        <input
                            value={form.email}
                            onChange={handleChange}
                            name="email"
                            type="email" id="email" placeholder="Email" />
                        {errors.email && <p className="modal-error" >{errors.email}</p>}
                    </div>
                    <div className="form-input">
                        <label htmlFor="password">Password</label>
                        <input
                            value={form.password}
                            onChange={handleChange}
                            name="password"
                            type="password" id="password" placeholder="Password" />
                        {errors.password && <p className="modal-error" >{errors.password}</p>}
                    </div>
                    <div className="form-input">
                        <label htmlFor="phone">Phone Number</label>
                        <input
                            value={form.phoneNumber}
                            onChange={handleChange}
                            name="phoneNumber"
                            type="text" id="phone" placeholder="Phone Number" />
                        {errors.phoneNumber && <p className="modal-error" >{errors.phoneNumber}</p>}
                    </div>
                    <div className="form-select">
                        <label htmlFor="rol">Rol</label>
                        <select name="rol" id="rol" onChange={handleChange} >
                            <option selected disabled >Rol</option>
                            <option name="rol" value="User" >User</option>
                            <option name="rol" value="Admin"  >Admin</option>
                        </select>
                        {errors.rol && <p className="modal-error" >{errors.rol}</p>}
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