/* Tables 
user
Mentor 
Review 
recommend_student table
*/
export const table = {
    users : "users" ,
    mentors : "mentors" ,
    reviews : "reviews"  ,
    recommend_student : "recommend_student"
}

export const userSchema = `id varchar(36) primary key,username varchar(255),password varchar(255)`;
export const mentorSchema = `id varchar(36) primary key,username varchar(255),password varchar(255) , rating int`;

export const reviewSchema = 
` 
    user_id varchar(36),
    mentor_id varchar(36),
    rating int default ${0},
    review text,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES ${table.users} (id) ON DELETE CASCADE,
    CONSTRAINT fk_mentor FOREIGN KEY (mentor_id) REFERENCES ${table.mentors} (id) ON DELETE CASCADE

`;

export const recommend_student_schema = 
`
    mentor_id varchar(36) ,
    user_id varchar(36) ,
    link text ,
    foreign key(user_id) references ${table.users}(id),
    foreign key(mentor_id) references ${table.mentors}(id)
`;


