import tkinter as tk
from tkinter import ttk, Label, StringVar
import os
import threading
import darkdetect, sv_ttk, ntkutils
import webbrowser
import ctypes, sys
import json
import winreg

def is_admin():
    try:
        return ctypes.windll.shell32.IsUserAnAdmin()
    except:
        return False

class App:
    def __init__(self, root):
        self.root = root
        if darkdetect.theme() == "Dark":
            ntkutils.dark_title_bar(self.root)
            sv_ttk.set_theme("dark")
        else:
            sv_ttk.set_theme("light")
        self.root.title("ItsBetter - Autoriser l'extension")
        self.root.geometry("400x200")
##        self.root.iconbitmap(r'itsbetter-icon-48.ico')
        self.icon_base64 = 'iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACxMAAAsTAQCanBgAAARtSURBVFhHvZdrbFRFFMf/M/fubldoUdQ+BCyigIpAUkFNxQcxPgimKg/RmFQNkUSN8aPBhMQaI6HBrGiC+qVUE6OYQMWoKLQKiVaoKGCoCNEKpRY0DVBcurt39854Znb20d1L2S4uv+TuzJw7957/zD1zZpYhB7nnPZ9zOrwYki2TDLdQWc0YuLn9vyJ6dmGYAKdjXb0UbgsYm25MJUM5d//cnREQ6wg9LgU+oNHaxlQyUs4VWoDTsbZeCL6DMebT1hIien4g512mBVjqm7tRdxs5rzS2kpHrXMGdk+GlVE5LNs+D7TeV0SIh/sh3ruDg/FFTz2DZsGcuhHXt7cZAHWtugP+OFWBlFcZSKMo5ffMj+c4VannNTVYzsEAFeOVU8KtmUCO5Apl/DPWm+PQHdbswRnau4ELIalNPI4dOIrH/M32BlkZxnN+5gnNuhpiDGOiBPHPCtEZLYc4VLNYekqY+DH55LWTsLGR4QLet2jmwrpsHGf2X1LnapknEEN/XBsSj1KCUecU14NUqj3F69h+43V8jvucT3c8L7xTLLdizGmBNvdMYslATlnsZlEB7dgP4+Fp6B4mZMBP+hldR9mSL6ZFP5ulhUH6ilJj98lQ9ceALxDtbMlfXh3r0rKKKZqkOoncvhtbUIxK6F0Orb0X8m7cg+rv1s16cQ4AHStAIsOA49QtnWzMF8amkkYQ57SE4W19Ptj0oXMAIqNwu+n5JNpiVLAtk9AKyA5BIbSzu79/rtv/BVTppFcoFzUD2rib6DyDesQ68ajqCL3yJS1buRvC5T+FfsBLsskm6jxdFC8h2nsLpeBOR9Q9TcLZCnDgEUFz4KH0HX/yK0nq96TWcogR4OU8h+vbD+bwJ0Q2NiLwxH9HWpyl+GQKL1pC3/PgoXIBJyaL353M698I9vAOJfVvoM0ykpVpjrBkKF5CI60JGzugyFxYYQxnQO/hkPKJLVvwMSIry73TNvmmBLnOx5z2D4PNbYF1/j7EkYWXlsG+8n4QPQnjsLdaqxgdeMfUMlPWsyXN13hfHu/XGkujeCnva3To980tr9PbMqY894z64x/YCp47BrlsKX90isPJKMDq88MlzEHjoNfArpyC+8x16T6dxkIFFt4fcvGM3CfDf9SzE6b/gbHopvaup71j2xLvJc0IKkUDk7YUQfx/WSzCwuBl84ixzk6BsGO/cQBlybTqOUkjaNJWAPhIwwdjSqFG4h76Fe7DdWAwkjk+aTbveFFp3Q3r0cjBratX9KjrMkBgZC0Mc/UlPvxckoJ/Ftoc2Uwp/xNgMhe/nF0gbbdryY9NIc5GcqxnYyP2+wc1UPWhslGTo9HpxnP82NlC7ibP5TQkm2XKyOV7n9pIgEaVwfIo17UykN/mh9Usec3t/fJ/SZrGH/4KQFJoUqY3lq4/QOY1q2mo4+3LtbbRSWkv251TiV1fI5eOaj+4yluECFHLFzb7w+IElVF1GQigboei/52qdU3Gcnu+Skn00NnB1m5r25F0F8B+cyc1hqmvISAAAAABJRU5ErkJggg=='
        self.icon = tk.PhotoImage(data=self.icon_base64)
        self.root.iconphoto(True, self.icon)
        self.progress_txt = StringVar()
        self.progress_txt.set("0 %")
        self.task_txt = StringVar()
        self.task_txt.set("Prêt.")
        self.error_link_txt = StringVar()

        self.operations_card = ttk.Frame(self.root, width=300)
        self.operations_card.pack(pady=(20, 0))
        self.progress_card = ttk.Frame(self.operations_card, width=300)
        self.progress_card.pack()
        self.progress = ttk.Progressbar(self.progress_card, orient="horizontal", length=292, mode="determinate")
        self.progress.pack(side = "left")
        self.progress_label = Label(self.progress_card, textvariable=self.progress_txt, width=8, anchor="e")
        self.progress_label.pack(side = "right")
        self.task_label = Label(self.operations_card, textvariable=self.task_txt, anchor="nw", height=3, justify="left")
        self.task_label.pack(pady=0, anchor="nw")

        if darkdetect.theme() == "Dark":
            self.error_link = Label(self.operations_card, textvariable=self.error_link_txt, fg="#57c8ff")
        else:
            self.error_link = Label(self.operations_card, textvariable=self.error_link_txt, fg="#0560b6")
        self.error_link.pack(pady=0, anchor="nw")

        self.buttons_card = ttk.Frame(self.root)
        self.buttons_card.pack(pady=(30, 0))
        self.authorize_button = ttk.Button(self.buttons_card, text="Autoriser ItsBetter", style='Accent.TButton', command=self.authorize)
        self.authorize_button.pack(side = "left")
        self.unauthorize_button = ttk.Button(self.buttons_card, text="Supprimer l'autorisation", command=self.unauthorize)
        self.unauthorize_button.pack(side = "right", padx=(10, 0))

        self.tasks_count = {}
        self.progress_percent = 0

    def open_url(self, url):
        webbrowser.open_new(url)

    def increase_progress(self):
        self.tasks_count["done"] = self.tasks_count["done"]+1
        self.progress_percent = int((self.tasks_count["done"] / self.tasks_count["total"]) * 100)
        self.progress["value"] = self.progress_percent
        self.progress_txt.set(str(self.progress_percent)+" %")

    def start_proc_ui(self, total_tasks):
        self.error_link_txt.set("")
        self.error_link.config(cursor="")
        try:
            self.error_link.unbind("<Button 1>", self.error_link_funcid)
        except:
            pass
        self.authorize_button.config(state="disabled")
        self.unauthorize_button.config(state="disabled")
        self.progress["value"] = 0
        self.progress_txt.set("0 %")
        self.tasks_count = {"total": total_tasks, "done": 0}

    def end_proc_ui(self):
        self.authorize_button.config(state="normal")
        self.unauthorize_button.config(state="normal")

    def show_error(self, error, error_url):
        self.task_txt.set(error)
        self.error_link_txt.set("Aide pour résoudre les erreurs")
        self.error_link.config(cursor="hand2")
        self.error_link_funcid = self.error_link.bind("<Button-1>", lambda e: self.open_url(error_url))
        self.end_proc_ui()

    def authorize(self):
        def get_itsbetter_directory(path):
            folder_names = []
            for folder in os.listdir(path):
                folder_path = os.path.join(path, folder)
                if os.path.isdir(folder_path):
                    # Browse the first folder in each folder
                    sub_folder = next((f for f in os.listdir(folder_path) if os.path.isdir(os.path.join(folder_path, f))), None)
                    # Check if there is a "manifest.json" file in the first folder
                    if sub_folder:
                        sub_folder_path = os.path.join(folder_path, sub_folder)
                        manifest_file_path = os.path.join(sub_folder_path, "manifest.json")
                        if os.path.exists(manifest_file_path):
                            # Checks whether the value of the "name" key in the "manifest.json" file is "ItsBetter".
                            with open(manifest_file_path, 'r', encoding='utf-8') as manifest_file:
                                manifest_data = json.load(manifest_file)
                                if manifest_data.get("name") == "ItsBetter":
                                    folder_names.append(os.path.basename(folder_path))
            return folder_names

        def add_registry_value(key_path, value_name, value_data):
            try:
                key = winreg.OpenKey(winreg.HKEY_LOCAL_MACHINE, key_path, 0, winreg.KEY_SET_VALUE)
                winreg.SetValueEx(key, value_name, 0, winreg.REG_SZ, value_data)
                winreg.CloseKey(key)
                return {"key_path": key_path, "error": (False, "")}
            except Exception as e:
                return {"key_path": key_path, "error": (True, e)}

        def create_registry_key(key_path):
            try:
                key = winreg.CreateKey(winreg.HKEY_LOCAL_MACHINE, key_path)
                winreg.CloseKey(key)
                return {"key_path": key_path, "error": (False, "")}
            except Exception as e:
                return {"key_path": key_path, "error": (True, e)}

        def start_proc():
            self.start_proc_ui(4)
            try:
                if os.path.exists(self.extension_path):
                    self.increase_progress()
                    itsbetter_id = get_itsbetter_directory(self.extension_path)
                    if itsbetter_id:
                        self.increase_progress()
                        for key_path in [r"SOFTWARE\Policies\Google\Chrome\ExtensionInstallAllowlist", r"SOFTWARE\Policies\Google\Chrome\ExtensionInstallWhitelist"]:
                            self.error = []
                            self.error.append(create_registry_key(key_path))
                            self.error.append(add_registry_value(key_path, "3420", itsbetter_id[0]))
                            print(self.error)
                            if self.error[0]["error"][0] or self.error[1]["error"][0]:
                                self.show_error("Erreur : impossible d'ajouter les clés au registre\n"+str(self.error[0]["error"][0])+"\n"+str(self.error[1]["error"][0]), "https://github.com/devmlb/itsbetter/wiki/Installation,-mise-%C3%A0-jour-et-d%C3%A9sinstallation#impossible-dajouter-les-cl%C3%A9s-au-registre--impossible-de-supprimer-les-cl%C3%A9s-du-registre")
                                return
                            self.increase_progress()
                        self.task_txt.set("Autorisation : succès. Pour que les modifications soient\nappliquées, redémarrez Chrome en entrant 'chrome://restart'\ndans la barre d'adresse. Vos onglets seront réouverts.")
                        self.end_proc_ui()
                    else:
                        self.show_error("Erreur : impossible de localiser le répertoire d'installation\nd'ItsBetter. Avez-vous bien installé l'extension ?", "https://github.com/devmlb/itsbetter/wiki/Installation,-mise-%C3%A0-jour-et-d%C3%A9sinstallation#impossible-de-localiser-le-r%C3%A9pertoire-dinstallation-ditsbetter-avez-vous-bien-install%C3%A9-lextension-")
                else:
                    self.show_error("Erreur : impossible de localiser le répertoire d'installation de\nChrome.", "https://github.com/devmlb/itsbetter/wiki/Installation,-mise-%C3%A0-jour-et-d%C3%A9sinstallation#impossible-de-localiser-le-r%C3%A9pertoire-dinstallation-de-chrome")
            except Exception as e:
                self.show_error("Erreur inconnue :\n"+str(e), "https://github.com/devmlb/itsbetter/wiki/Installation,-mise-%C3%A0-jour-et-d%C3%A9sinstallation#erreur-inconnue")

        self.username = os.getlogin()
        self.extension_path = f"C:\\Users\\{self.username}\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Extensions"
        threading.Thread(target=start_proc).start()

    def unauthorize(self):
        def delete_registry_value(key_path, value_name):
            try:
                key = winreg.OpenKey(winreg.HKEY_LOCAL_MACHINE, key_path, 0, winreg.KEY_SET_VALUE)
                winreg.DeleteValue(key, value_name)
                winreg.CloseKey(key)
                return {"key_path": key_path, "error": (False, "")}
            except FileNotFoundError:
                return {"key_path": key_path, "error": (False, "")}
            except Exception as e:
                return {"key_path": key_path, "error": (True, e)}

        def delete_registry_key_if_empty(key_path):
            try:
                key = winreg.OpenKey(winreg.HKEY_LOCAL_MACHINE, key_path, 0, winreg.KEY_READ)
                # Checks if the key is empty
                if winreg.QueryInfoKey(key)[1] == 0:
                    print("coucou")
                    winreg.DeleteKey(winreg.HKEY_LOCAL_MACHINE, key_path)
                winreg.CloseKey(key)
                return {"key_path": key_path, "error": (False, "")}
            except FileNotFoundError:
                return {"key_path": key_path, "error": (False, "")}
            except OSError as e:
                if "WinError 5" in str(e):
                    return {"key_path": key_path, "error": (False, "")}
                return {"key_path": key_path, "error": (True, e)}

        def start_proc():
            self.start_proc_ui(6)
            try:
                key_paths = [
                    r"SOFTWARE\Policies\Google\Chrome\ExtensionInstallWhitelist",
                    r"SOFTWARE\Policies\Google\Chrome\ExtensionInstallAllowlist",
                    r"SOFTWARE\Policies\Google\Chrome",
                    r"SOFTWARE\Policies\Google"
                ]
                # Delete the value "3420" from each key
                for key_path in key_paths[:2]:
                    error = delete_registry_value(key_path, "3420")
                    if error["error"][0]:
                        self.show_error("Erreur : impossible de supprimer les clés du registre\n"+str(error["error"][1]), "https://github.com/devmlb/itsbetter/wiki/Installation,-mise-%C3%A0-jour-et-d%C3%A9sinstallation#impossible-dajouter-les-cl%C3%A9s-au-registre--impossible-de-supprimer-les-cl%C3%A9s-du-registre")
                        return
                    self.increase_progress()
                # Delete empty keys
                for key_path in key_paths:
                    error = delete_registry_key_if_empty(key_path)
                    if error["error"][0]:
                        self.show_error("Erreur : impossible de supprimer les clés du registre\n"+str(error["error"][1]), "https://github.com/devmlb/itsbetter/wiki/Installation,-mise-%C3%A0-jour-et-d%C3%A9sinstallation#impossible-dajouter-les-cl%C3%A9s-au-registre--impossible-de-supprimer-les-cl%C3%A9s-du-registre")
                        return
                    self.increase_progress()

                self.task_txt.set("Suppression : succès. Pour que les modifications soient\nappliquées, redémarrez Chrome en entrant 'chrome://restart'\ndans la barre d'adresse. Vos onglets seront réouverts.")
                self.end_proc_ui()
            except Exception as e:
                self.show_error("Erreur inconnue :\n"+str(e), "https://github.com/devmlb/itsbetter/wiki/Installation,-mise-%C3%A0-jour-et-d%C3%A9sinstallation#erreur-inconnue")

        threading.Thread(target=start_proc).start()

if is_admin():
    if __name__ == "__main__":
        root = tk.Tk()
        app = App(root)
        root.resizable(False, False)
        root.mainloop()
else:
    # Re-run the program with admin rights
    ctypes.windll.shell32.ShellExecuteW(None, "runas", sys.executable, " ".join(sys.argv), None, 1)