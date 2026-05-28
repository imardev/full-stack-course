import Header from "./Header";
import Total from "./Total";
const Course = ({ courses }) => {
  return (
    <>
      {courses.map((course) => (
        <div key={course.id}>
          <Header course={course} />
          {course.parts.map((part) => (
            <p key={part.id}>
              {part.name} {part.exercises}
            </p>
          ))}
          <Total course={course} />
        </div>
      ))}
    </>
  );
};

export default Course;
