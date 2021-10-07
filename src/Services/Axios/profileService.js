import { STORAGE_KEY } from "../../Auth/Auth";
import { APIProfile } from "./BaseService/index";

function getToken() {
    return String(localStorage.getItem(STORAGE_KEY));
}

export async function registerUser(user, toast) {
    try {
        await APIProfile.post(
            "/register",
            {
                email: user.email,
                password: user.password,
                departmentID: user.departmentID,
                level: user.level,
                sectionID: user.sectionID,
            },
            { headers: { "X-Access-Token": getToken() } }
        );

        toast.success("Usuário cadastrado com sucesso");
    } catch (err) {
        const status = err.response?.status;

        if (status === 401) {
            toast.error(
                "Você não possui privilégios suficientes para realizar esta ação"
            );
        } else if (status === 400) {
            toast.error("Faltam algumas informações para realizar o cadastro do usuário");
        } else {
            toast.error(`Erro ao cadastrar usuário!`);
        }
    }
}

export async function loginUser(user, toast) {
    try {
        const response = await APIProfile.post("/login", {
            email: user.email,
            password: user.password,
        });

        APIProfile.defaults.headers.common["x-access-token"] = response.data.token;

        return response.data;
    } catch (err) {
        const status = err.response?.status;

        if (status === 401) {
            toast.error("Usuário e/ou senha inválidos");
        } else if (status === 400) {
            toast.error("Requisição inválida");
        } else {
            toast.error("Não foi possivel fazer login. Tente novamente mais tarde.");
        }

        console.error(err);
        return null;
    }
}

export async function listAllUsers(toast) {
    try {
        const response = await APIProfile.post(
            "/users/all",
            {},
            {
                headers: { "X-Access-Token": getToken() },
            }
        );
        return response.data;
    } catch (err) {
        const status = err.response?.status;

        if (status === 401) {
            toast.error(
                "Você não possui privilégios suficientes para realizar esta ação"
            );
        }
    }
}

export async function getUserAccessLevel(user, toast) {
    try {
        const response = await APIProfile.post(
            "/user/access-level",
            {},
            { headers: { "X-Access-Token": getToken() } }
        );
        return response.data;
    } catch (err) {
        const status = err.response?.status;

        if (status === 500) {
            toast.error("Erro ao obter informações sobre o seu nível de acesso");
        }
    }
}
