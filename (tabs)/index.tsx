import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useEffect, useState } from "react";

export default function TabTwoScreen() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const weekName = { weekday: "long" as const };
  const monthName = { month: "long" as const };
  const nharLioum = currentDate.toLocaleDateString("en-US", weekName);
  const chharLioum = currentDate.toLocaleDateString("en-US", monthName);

  function getNextDeadline(targetDay: number, hour: number, minute: number) {
    let currentDay = currentDate.getDay();
    let daysBeforeDeadline = (targetDay - currentDay + 7) % 7;
    //[0,1,2,3,4,5,6] week in aray w ke tfout il 6 tarja3 li 0 hawka aleh il mod
    //exemple : (6 - 4 + 7) % 7 = 2 days

    let nextDeadline = new Date();
    nextDeadline.setDate(currentDate.getDate() + daysBeforeDeadline); //par exp: curr 5 + 1 days before deadline (6 saturday)
    nextDeadline.setHours(hour, minute, 0);
    return nextDeadline;
  }

  //nfixiou les deadlines
  const deadlineMonday = getNextDeadline(1, 17, 0);
  const deadlineThursday = getNextDeadline(4, 2, 37);
  const deadlineSaturday = getNextDeadline(6, 14, 54);

  let deadlines = [deadlineMonday, deadlineThursday, deadlineSaturday];
  let nextDeadline = deadlines.reduce((prev, curr) =>
    curr < prev ? curr : prev
  );
  //nchufu a9reb deadline positif

  const diff = nextDeadline.getTime() - currentDate.getTime();
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(
    (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const diffMinutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const diffSeconds = Math.floor((diff % (1000 * 60)) / 1000);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
  }, []);

  return (
    <ParallaxScrollView>
      <ThemedText>{currentDate.toLocaleString()}</ThemedText>
      <ThemedView>
        <ThemedText style={styles.text} type="title">
          Current Date {nharLioum} on {chharLioum}
        </ThemedText>
      </ThemedView>
      <ThemedText>
        Next Deadline: {nextDeadline.toLocaleDateString("en-US", weekName)} on{" "}
        {nextDeadline.toLocaleString()}
      </ThemedText>
      <ThemedView style={styles.countdown}>
        <ThemedText style={styles.numberss}>
          {diffDays} <span style={styles.span}>Days</span>
        </ThemedText>
        <ThemedText style={styles.numberss}>
          {diffHours} <span style={styles.span}>Hrs</span>
        </ThemedText>
        <ThemedText style={styles.numberss}>
          {diffMinutes} <span style={styles.span}>Min</span>
        </ThemedText>
        <ThemedText style={styles.numberss}>
          {diffSeconds} <span style={styles.span}>Sec</span>
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#E5F",
    flexDirection: "row",
    marginHorizontal: "auto",
    fontSize: 28,
  },
  countdown: {
    flexDirection: "row",
    gap: 12,
  },
  numberss: {
    flexDirection: "row",
    marginHorizontal: "auto",
    marginVertical: 20,
    fontSize: 22,
  },
  span: {
    fontSize: 12,
    color: "#2F5",
  },
});
