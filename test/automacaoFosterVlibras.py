import tkinter as tk
from tkinter import messagebox
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.firefox.service import Service as FirefoxService
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
#from selenium.webdriver.chrome.service import Service as  ChromeService #Import do webdriver Chrome 

# Função para criar a interface gráfica
def ask_user():
    root = tk.Tk()
    root.withdraw()  # Esconde a janela principal

    result = messagebox.askquestion("Iniciar VLibras", "Deseja iniciar o VLibras neste site?", icon='question')
    
    root.quit()  # Fecha a janela da interface gráfica
    return result == 'yes'

# Configurar o driver do Firefox
service = FirefoxService(executable_path="..\\Foster-main\\test\\geckodriver.exe")
driver = webdriver.Firefox(service=service)

# Configurar o driver do Chrome
#service = ChromeService(executable_path="..\\Foster-main\\test\\chromedriver.exe")
#driver = webdriver.Chrome(service=service)

# Maximizar a janela após abrir o navegador
driver.maximize_window()

# Endereço de acesso para realização de testes
endereco = "https://foster-7u8w.onrender.com/"
enderecoStores = endereco + "stores"
enderecoCreateStore = endereco + "create-store"

# Acessar as páginas
pages = [endereco, enderecoStores, enderecoCreateStore]

# Variável de controle para "Não, obrigado"
deny_button_clicked = False

for page in pages:
    driver.get(page)
    
    # Perguntar ao usuário se deseja iniciar o VLibras
    if ask_user():
        try:
            # Localizar o ícone de acessibilidade do VLibras
            vlibras_button = WebDriverWait(driver, 20).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, 'img.access-button[data-src="assets/access_icon.svg"]'))
            )
            print(f"Ícone do VLibras encontrado. Abrindo a página {page}...")
            vlibras_button.click()  # Simula o clique para abrir o VLibras
            
            # Pular animação em cada página
            try:
                skip_button = WebDriverWait(driver, 20).until(
                    EC.element_to_be_clickable((By.XPATH, "//button[@title='Pular animação']"))
                )
                print(f"Pular animação na página {page}...")
                ActionChains(driver).move_to_element(skip_button).click().perform()
            except Exception as e:
                print(f"Botão 'Pular animação' não encontrado na página {page}. Continuando...")

            # Clicar no botão "Não, obrigado" apenas uma vez
            if not deny_button_clicked:
                try:
                    deny_button = WebDriverWait(driver, 20).until(
                        EC.element_to_be_clickable((By.XPATH, "//button[@class='vpw-guide__main__deny-btn']"))
                    )
                    print("Clicando em 'Não, obrigado'...")
                    deny_button.click()
                    deny_button_clicked = True  # Marca que o botão foi clicado
                except Exception as e:
                    print("Botão 'Não, obrigado' não encontrado.")
        
        except Exception as e:
            print(f"Erro ao interagir com o VLibras na página {page}: {e}")

# Esperar até que o usuário decida fechar
input("Pressione Enter para fechar o navegador...")

# Fechar o navegador
driver.quit()
