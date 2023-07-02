export const getUserQuery = `
   query GetUser($email: String!) {
        user(by: { email: $email }) {
                name
				email
				avatarUrl
				description
				githubUrl
				linkedinUrl
				id
        }
   } 
`