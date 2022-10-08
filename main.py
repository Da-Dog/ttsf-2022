import matplotlib.pyplot as plt
import csv
import seaborn as sns
import pandas as pd


def get_cause_data():
    causes = {"Human": 0, "Natural": 0}
    with open("WFIGS_-_Wildland_Fire_Locations_Full_History.csv", encoding="utf-8-sig", mode="r") as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            cause = row["FireCause"]
            if cause in causes:
                causes[cause] += 1
    sns.set_theme()
    sns.barplot(x=list(causes.keys()), y=list(causes.values())).set(title="Wildfire Causes")


def get_human_cause_data():
    causes = {}
    with open("WFIGS_-_Wildland_Fire_Locations_Full_History.csv", encoding="utf-8-sig", mode="r") as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            if row["FireCause"] != "Human":
                continue
            cause = row["FireCauseGeneral"]
            if cause == "":
                continue
            if cause in causes:
                causes[cause] += 1
            else:
                causes[cause] = 1
    print(causes)
    df = pd.DataFrame.from_dict({"Cause": list(causes.keys()), "Count": list(causes.values())})
    plt.figure(figsize=(28, 7), dpi=240)
    sns.set_theme()
    sns.barplot(data=df, x='Count', y='Cause', order=df.sort_values('Count', ascending=False).Cause).set(title="Human Causes")


if __name__ == '__main__':
    # get_cause_data()
    # plt.show()
    # get_human_cause_data()
    # plt.show()
    pass
