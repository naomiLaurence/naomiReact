import { useNavigate } from "react-router-dom";
import auth from "../services/auth"
import dialogs, { showSuccessDialog } from "../ui/dialogs";
import { useForm } from "react-hook-form";
import patterns from "../validation/patterns";
import { CardData } from "../@types/cardsData";
import axios from "axios";
import { useAuth } from "../context/AuthContext";


const CreateCard = () => {
    const { token } = useAuth(); // Get the token from the context
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<CardData>();

    const onSubmit = async (data: CardData) => {
        if (!token) {
            dialogs.error("Error", "No authentication token found.");
            return;
        }

        try {
            await axios.post('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards', data, {
                headers: { 'x-auth-token': token }
            });
            dialogs.success("Success", "Card Created Successfully").then(() => {
                navigate("/my-cards");
            });
        } catch (error) {
            dialogs.error("Error", error.response.data);
        }
    };

    return (
        <div>
            <h2>Create a new page</h2>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>

                {/* title */}
                <section>
                    <input
                        type="text"
                        placeholder="Title"
                        {...register("title", {
                            required: "This field is mandatory",
                            minLength: { value: 2, message: "Too short" },
                            maxLength: { value: 255, message: "Too long" },
                        })}
                    />
                    {errors.title && (
                        <p className="text-red-500"> {errors.title.message} </p>
                    )}
                </section>


                {/* subtitle */}
                <section>
                    <input
                        type="text"
                        placeholder="Subtitle"
                        {...register("subtitle", {
                            required: "This field is mandatory",
                            minLength: { value: 2, message: "Too short" },
                            maxLength: { value: 255, message: "Too long" },
                        })}
                    />
                    {errors.subtitle && (
                        <p className="text-red-500"> {errors.subtitle.message} </p>
                    )}
                </section>

                {/* description */}
                <section>
                    <input
                        type="text"
                        placeholder="Description"
                        {...register("description", {
                            required: "This field is mandatory",
                            minLength: { value: 2, message: "Too short" },
                            maxLength: { value: 1024, message: "Too long" },
                        })}
                    />
                    {errors.description && (
                        <p className="text-red-500"> {errors.description.message} </p>
                    )}
                </section>

                {/* phone */}
                <section>
                    <input
                        type="tel"
                        placeholder="Phone"
                        {...register("phone", {
                            required: "This field is mandatory",
                            minLength: { value: 9, message: "Too short" },
                            maxLength: { value: 11, message: "Too long" },
                        })}
                    />
                    {errors.phone && (
                        <p className="text-red-500"> {errors.phone.message} </p>
                    )}
                </section>

                {/* email */}
                <section>
                    <input
                        type="email"
                        placeholder="Email"
                        {...register("email", {
                            required: "This field is mandatory",
                            pattern: patterns.email,
                        })}
                    />
                    {errors.email && (
                        <p className="text-red-500"> {errors.email.message} </p>
                    )}
                </section>

                {/* web */}
  

                <section>
                    <input
                        placeholder="Image URL"
                        type="url"
                        {...register("image.url", {
                            required: "This field is mandatory",
                            pattern: {
                                value: patterns.url,
                                message: "Invalid image URL",
                            },
                        })}
                    />
                    {errors.image?.url && (
                        <p className="text-red-500">{errors.image?.url?.message}</p>
                    )}
                </section>








                {/* image.alt */}
                <section>
                    <input
                        placeholder="Image Description"
                        type="text"
                        {...register("image.alt", {
                            minLength: { value: 2, message: "Too short" },
                            maxLength: { value: 255, message: "Too long" },
                        })}
                    />
                    {errors.image?.alt && (
                        <p className="text-red-500">{errors.image?.alt?.message}</p>
                    )}
                </section>

                {/* address.state*/}
                <section>
                    <input
                        placeholder="State"
                        type="text"
                        {...register("address.state", {
                        })}
                    />
                    {errors.address?.state && (
                        <p className="text-red-500">{errors.address?.state?.message}</p>
                    )}
                </section>


                {/* address.country */}
                <section>
                    <input
                        placeholder="Country"
                        type="text"
                        {...register("address.country", {
                            required: "This field is mandatory",
                        })}
                    />
                    {errors.address?.country && (
                        <p className="text-red-500">{errors.address?.country?.message}</p>
                    )}
                </section>


                {/* address.city */}
                <section>
                    <input
                        placeholder="City"
                        type="text"
                        {...register("address.city", {
                            required: "This field is mandatory",
                        })}
                    />
                    {errors.address?.city && (
                        <p className="text-red-500">{errors.address?.city?.message}</p>
                    )}
                </section>


                {/* address.street */}
                <section>
                    <input
                        placeholder="Street"
                        type="text"
                        {...register("address.street", {
                            required: "This field is mandatory",
                        })}
                    />
                    {errors.address?.street && (
                        <p className="text-red-500">{errors.address?.street?.message}</p>
                    )}
                </section>


                {/* address.houseNumber */}
                <section>
                    <input
                        placeholder="House Number"
                        type="number"
                        {...register("address.houseNumber", {
                            required: "This field is mandatory",
                            minLength: { value: 1, message: "Too short" },
                        })}
                    />
                    {errors.address?.houseNumber && (
                        <p className="text-red-500">{errors.address?.houseNumber?.message}</p>
                    )}
                </section>


                {/* address.zip */}
                <section>
                    <input
                        placeholder="Zip"
                        type="number"
                        {...register("address.zip", {
                        })}
                    />
                    {errors.address?.houseNumber && (
                        <p className="text-red-500">{errors.address?.zip?.message}</p>
                    )}
                </section>

                <button type="submit">Create Card</button>

            </form>
        </div>
    )
}

export default CreateCard;