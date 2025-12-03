### Hosting services
+ Frontend: Vercel
+ Backend: Render
+ Database: MongoDB Atlas

### System design
Clerk authentication + MongoDB -> NodeJS -> React

<u>Webhooks used to sync user data from Clerk to MongoDB</u>

#### MongoDB will store:
+ Rental car information, i.e., which cars are available and how many
+ Users current rental & rental history - tied to Clerk user account
+ List of all current active rentals - tied to car information
+ Audit logs