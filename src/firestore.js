import { useState, useEffect } from "react";
import { db } from "./firebase";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  where,
  query,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";
import { useAuthContext } from "./contexts/AuthContext";

function useDB() {
  const { user } = useAuthContext(); // importing from auth.js

  const [ongoingTasks, setOngoingTasks] = useState([]); // ongoing tasks state
  const [completedTasks, setCompletedTasks] = useState([]); // completed tasks state
  const [taskLoading, setTaskLoading] = useState(false); // loading state

  const getOngoingTasksQuery = (userID) => {
    // query for fetching ongoing tasks
    return query(
      collection(db, "tasks"),
      where("user_id", "==", userID),
      where("completed", "==", false)
    );
  };
  const getCompletedTasksQuery = (userID) => {
    // query for fetching completed tasks
    return query(
      collection(db, "tasks"),
      where("user_id", "==", userID),
      where("completed", "==", true)
    );
  };
  const mapQuerySnapshots = (querySnapshot) => {
    // firestore docs mapping, used in useEffect()
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  };
  const checkFetching = (ongoing, completed) => {
    if (ongoing && completed) setTaskLoading(false); //reset loading to false
  };

  const addTask = async (title, desc, due, createdAt) => {
    // function for adding tasks to firestore
    try {
      const docRef = await addDoc(collection(db, "tasks"), {
        user_id: user.uid,
        title,
        desc,
        due,
        createdAt,
        completed: false,
      });
      console.log("task added with id ", docRef.id);
    } catch (error) {
      console.log("error adding task: ", error);
    }
  };

  const delTask = async (taskID) => {
    // function for deleting task from firestore
    try {
      await deleteDoc(doc(db, "tasks", taskID));
      console.log("Task deleted with id ", taskID);
    } catch (e) {
      console.log(e);
    }
  };

  const updateTaskCompleted = async (task) => {
    // function for updating task complete staus (using checkbox)
    const taskRef = doc(db, "tasks", task.id);

    try {
      // update completed state
      await updateDoc(taskRef, {
        completed: !task.completed,
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!user) return;

    //fetching status
    setTaskLoading(true);
    let ongoingFetched = false;
    let completedFetched = false;

    const q_ongoing = getOngoingTasksQuery(user.uid); // fetching uncompleted tasks
    const q_completed = getCompletedTasksQuery(user.uid); // fetching completed tasks

    const unsubscribeOngoing = onSnapshot(q_ongoing, (querySnapshot) => {
      // function to fetch ongoing tasks realtime
      const taskList = mapQuerySnapshots(querySnapshot);
      setOngoingTasks(taskList);

      ongoingFetched = true; // mark as fetched
      checkFetching(ongoingFetched, completedFetched);
    });

    const unsubscribeCompleted = onSnapshot(q_completed, (querySnapshot) => {
      // function to fetch completed tasks realtime
      const taskList = mapQuerySnapshots(querySnapshot);
      setCompletedTasks(taskList);

      completedFetched = true; // mark as fetched
      checkFetching(ongoingFetched, completedFetched);
    });

    return () => {
      unsubscribeOngoing();
      unsubscribeCompleted();
    };
  }, [user]);

  return {
    addTask,
    delTask,
    ongoingTasks,
    completedTasks,
    updateTaskCompleted,
    taskLoading,
  };
}

export default useDB;
