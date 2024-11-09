export default function InviteClubMember({ email, role, club }) {
    return (
        <div>
            <h1>Hello {email}! You have been invited to join a club!</h1>
            <p>Role: {role}</p>
            <p>Club: {club}</p>
        </div>
    )
}