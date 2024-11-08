export default function InviteOcaMember({ email, password }) {
    return (
        <div>
            <h1>You have been invited to join OCA Connect!</h1>
            <p>Email: {email}</p>
            <p>Password: {password}</p>
        </div>
    )
}