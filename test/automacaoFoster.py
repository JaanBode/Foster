import time
import random
from faker import Faker
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.firefox.service import Service as FirefoxService

# Configurar o driver do Firefox
service = FirefoxService(executable_path="..\\Foster-main\\test\\geckodriver.exe")
driver = webdriver.Firefox(service=service)

# Inicializar Faker para gerar dados aleatórios
fake = Faker()

# Função para gerar dados aleatórios de loja
def generate_store_data():
    return {
        "name": fake.company(),
        "about": fake.sentence(),
        "whatsapp": fake.phone_number(),
        "image_url": fake.image_url(),
        "products": fake.bs(),
        "hours": f"{random.randint(6, 10)}:00 - {random.randint(18, 22)}:00",
        "open_on_weekends": random.choice([True, False]),
        "lat": str(random.uniform(-90, 90)),
        "lng": str(random.uniform(-180, 180))
    }

# Endereço de acesso para realização de testes
endereco = "https://foster-7u8w.onrender.com/"
enderecoStores = endereco + "stores"
enderecoCreateStore = endereco + "create-store"

try:
    # Passo 1: Acessar a página de criação de lojas
    driver.get(enderecoCreateStore)
    wait = WebDriverWait(driver, 10)

    # Preencher 100 formulários com dados aleatórios
    for _ in range(100):
        store_data = generate_store_data()

        # Preencher dados do formulário
        wait.until(EC.presence_of_element_located((By.ID, "name"))).send_keys(store_data["name"])
        driver.find_element(By.ID, "about").send_keys(store_data["about"])
        driver.find_element(By.ID, "whatsapp").send_keys(store_data["whatsapp"])
        driver.find_element(By.NAME, "images").send_keys(store_data["image_url"])
        driver.find_element(By.ID, "instructions").send_keys(store_data["products"])
        driver.find_element(By.ID, "opening_hours").send_keys(store_data["hours"])

        # Usar JavaScript para definir latitude e longitude
        driver.execute_script(f'document.getElementsByName("lat")[0].value="{store_data["lat"]}";')
        driver.execute_script(f'document.getElementsByName("lng")[0].value="{store_data["lng"]}";')

        # Selecionar 'Sim' ou 'Não' para atender finais de semana
        if store_data["open_on_weekends"]:
            driver.find_element(By.CSS_SELECTOR, ".button-select button.active").click()

        # Submeter o formulário
        driver.find_element(By.CSS_SELECTOR, "form .primary-button").click()

        # Esperar que a página de criação seja recarregada ou que a resposta seja processada
        time.sleep(2)  # Aguardar 2 segundos para garantir que o formulário seja submetido

        # Recarregar a página para o próximo formulário
        driver.get(enderecoCreateStore)
        wait.until(EC.presence_of_element_located((By.ID, "name")))

    # Passo 2: Acessar a página de listagem de lojas após completar 100 formulários
    driver.get(enderecoStores)
    stores = wait.until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, ".stores span[data-name]")))

    print("100 formulários inseridos com sucesso!")

finally:
    time.sleep(10)
    driver.quit()