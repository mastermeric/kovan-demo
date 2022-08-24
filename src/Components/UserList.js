import React, { useState, useMemo } from 'react';
import { useQuery, gql } from '@apollo/client';
import UsersGrid from './UsersGrid';
import { Button, Alert, Row, Col } from 'reactstrap';

const UserList = () => {
  const [todoData, setTodoData] = useState([]);

  const FETCH_TODO_QUERY = gql`
    query {
      todos @rest(type: "Todos", path: "todos") {
        userId
        id
        title
        completed
      }
    }
  `;

  const { data, loading, error } = useQuery(FETCH_TODO_QUERY, {
    onCompleted: (response) => handleFetchTodoRequestCallback(response, true),
    onError: (response) => handleFetchTodoRequestCallback(response),
  });

  const handleFetchTodoRequestCallback = (response, requestSuccess) => {
    if (requestSuccess) {
      setTodoData(data.todos);
    } else {
      alert('Some error occured');
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: 'User Id',
        accessor: 'userId',
      },
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Title',
        accessor: 'title',
      },
      {
        Header: 'Completed',
        accessor: 'completed',
        Cell: function (props) {
          return <input type="checkbox" checked={props.value} />;
        },
      },
    ],
    []
  );

  const gridData = useMemo(() => todoData, [todoData]);

  return (
    <>
      <div className="users-data">
        {/* <Alert color="info">
        <Row>
          <Col className="text-center">
            <i className="fas fa-user fa-2x text-muted"></i>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col className="text-center">
            <strong className="mr-2">Heads up!</strong> Prospect(s) are imported
            to Koncert successfully!
          </Col>
        </Row>
      </Alert>
      <Row className="my-3">
        <Col className="text-center">
          <Button
            color="info"
            // onClick={handleMoveToProspectList}
            // disabled={loading}
          >
            <i className="fas fa-user mr-2"></i>
            View Prospects
          </Button>
        </Col>
      </Row> */}
        {!loading && !error && <UsersGrid columns={columns} data={gridData} />}
      </div>
    </>
  );
};

export default UserList;
