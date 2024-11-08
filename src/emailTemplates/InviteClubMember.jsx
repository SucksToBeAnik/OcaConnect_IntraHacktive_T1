export default function InviteClubMember({ email, password }) {
    return (
        <div>
            <h1>You have been invited to join a club!</h1>
            <p>Email: {email}</p>
            <p>Password: {password}</p>
        </div>
    )
}