import React from "react";

import { useQuery } from "react-apollo-hooks";
import gql from "graphql-tag";
import { Link } from "react-router-dom";

const ALL_EXAMS_QUERY = gql`
  query ALL_EXAMS_QUERY {
    exam {
      id
    }
  }
`;

const Main = () => {
  const { data = {}, error, loading } = useQuery(ALL_EXAMS_QUERY);

  if (error) console.log(error);
  if (loading) return <h1 style={{ textAlign: "center" }}> Loading </h1>;

  return (
    <div className="answers">
      <ul>
        {data.exam.map(({ id }, index) => (
          <li data-id={index} key={id}>
            <span>{index + 1}</span>
            <p>
              <Link to={`/exam/${id}`}>exam with id {id} </Link>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Main;
