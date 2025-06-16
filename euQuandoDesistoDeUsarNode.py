import time
import keyboard
import sys

import json


pause = 0
beatmap = {
    "coasting":[]
}

# Inicializar o mixer
pygame.mixer.init()

# Carregar a música (deixe o arquivo musica.mp3 ou musica.wav na mesma pasta)
pygame.mixer.music.load("source\musicas\Coasting.mp3")

# Função para tocar música
def tocar_musica():
    pygame.mixer.music.play()

start = time.time()
tocar_musica()

# Funções para cada tecla
def tecla_d(e):
    beatmap["coasting"].append([round(time.time() - start, 3)*1000,"1,0,0,0"])

def tecla_f(e):
    beatmap["coasting"].append([round(time.time() - start, 3)*1000,"0,1,0,0"])

def tecla_j(e):
    beatmap["coasting"].append([round(time.time() - start, 3)*1000,"0,0,1,0"])

def tecla_k(e):
    beatmap["coasting"].append([round(time.time() - start, 3)*1000,"0,0,0,1"])

def pausear(e):
    
    startpause = time.time()
    pygame.mixer.music.pause()
    
def tecla_p(e):
    pygame.mixer.music.unpause()


    
    
    



def sair(e):
    print("Saindo do jogo... Até a próxima!")
    pygame.mixer.music.stop()
    keyboard.unhook_all()  # Remove todos os ganchos
    # convert into JSON:
    with open('js/objetos/coasting3.json', 'w') as f:
        json.dump(beatmap, f)
    exit()

# Associar eventos de soltar tecla
keyboard.on_release_key('d', tecla_d)
keyboard.on_release_key('f', tecla_f)
keyboard.on_release_key('j', tecla_j)
keyboard.on_release_key('k', tecla_k)
keyboard.on_release_key('esc', sair)
keyboard.on_release_key('space', pausear)
keyboard.on_release_key('p', tecla_p)


# Manter o programa rodando
keyboard.wait()